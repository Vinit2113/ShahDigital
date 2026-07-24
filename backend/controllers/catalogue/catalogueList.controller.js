const dbConn = require("../../db/knex");

// Moved out of controllers/products - the public catalogue is a distinct
// feature from product management (no pricing/stock, only what a visitor
// browsing the public catalogue page - or an admin previewing it - should
// see), so it gets its own controller + route namespace instead of living
// under /products.
const catalogueList = async (req, res) => {
  try {
    const catalogueData = await dbConn("shahDigital.products AS p")
      .select(
        "c.cat_id",
        "c.cat_display_name",
        "b.brand_id",
        "b.brand_display_name",
        "b.brand_image",
        "p.product_id",
        "p.product_display_name",
        "p.short_description",
        "p.full_description",
        "pf.feature_name",
      )
      .join("shahDigital.categories AS c", "p.cat_id", "c.cat_id")

      .leftJoin(
        "shahDigital.product_features AS pf",
        "p.product_id",
        "pf.product_id",
      )
      .join("shahDigital.brands AS b", "p.brand_id", "b.brand_id")
      .whereNull("p.deleted_at")
      .whereNull("c.deleted_at")
      .whereNull("b.deleted_at")
      .where("b.brand_is_active", 1)
      .orderBy("p.product_id", "desc");

    // GET PRODUCT ID FROM CATALOGUE
    const productId = catalogueData.map((item) => item.product_id);

    // FETCH SINGLE IMAGES BASED ON THOSE PRODUCT IDS
    const getImages = await dbConn("shahDigital.product_media")
      .select("product_id", "media_url")
      .whereIn("product_id", productId)
      .where("media_type", "image")
      .whereNull("deleted_at")
      .orderBy("media_id", "asc");

    // FETCH CONDITION (NEW / REFURBISHED / USED / OPEN BOX) VIA THE EXISTING
    // ATTRIBUTES SYSTEM - KEPT AS A SEPARATE QUERY (LIKE IMAGES ABOVE) SO IT
    // DOESN'T MULTIPLY ROWS AGAINST THE product_features LEFT JOIN
    const conditionAttribute = await dbConn("shahDigital.attributes")
      .where({ attribute_name: "condition", attribute_is_active: 1 })
      .first();

    let conditionByProductId = {};
    if (conditionAttribute) {
      const conditions = await dbConn("shahDigital.product_attributes")
        .select("product_id", "attribute_value", "display_product_attribute")
        .where("attribute_id", conditionAttribute.attribute_id)
        .whereIn("product_id", productId)
        .whereNull("deleted_at");

      conditionByProductId = conditions.reduce((acc, item) => {
        acc[item.product_id] =
          item.display_product_attribute || item.attribute_value;
        return acc;
      }, {});
    }

    // ATTACH FIRST IMAGE AND CONDITION TO EACH PRODUCT
    const catalogueWithImages = catalogueData.map((product) => {
      const productImage = getImages.find(
        (img) => img.product_id === product.product_id,
      );
      return {
        ...product,
        media_url: productImage ? productImage.media_url : null,
        condition: conditionByProductId[product.product_id] || null,
      };
    });

    const groupedProducts = Object.values(
      catalogueWithImages.reduce((acc, item) => {
        if (!acc[item.product_id]) {
          acc[item.product_id] = {
            product_id: item.product_id,
            product_display_name: item.product_display_name,
            short_description: item.short_description,
            full_description: item.full_description,
            cat_id: item.cat_id,
            cat_display_name: item.cat_display_name,
            brand_id: item.brand_id,
            brand_display_name: item.brand_display_name,
            brand_image: item.brand_image,
            media_url: item.media_url,
            condition: item.condition,
            features: [],
          };
        }

        if (item.feature_name) {
          acc[item.product_id].features.push(item.feature_name);
        }

        return acc;
      }, {}),
    );

    return res.status(200).json({
      message: "Catalogue list fetched successfully",
      data: groupedProducts,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({
        message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
      });
  }
};

module.exports = catalogueList;
