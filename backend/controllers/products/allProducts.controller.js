const dbConn = require("../../db/knex");

const listProductsAdmin = async (req, res) => {
  try {
    // Get all product details
    const products = await dbConn("shahDigital.products as p")
      .select(
        "p.product_id",
        "p.product_name",
        "p.product_display_name",
        "p.short_description",
        "p.full_description",
        "p.product_current_price",
        "p.product_discounted_price",
        "p.product_stock_quantity",
        "p.created_at",

        "c.cat_id",
        "c.cat_name",
        "c.cat_display_name",

        "b.brand_id",
        "b.brand_name",
        "b.brand_display_name",
        "b.brand_description",
        "b.brand_image",

        "pf.feature_name",
      )
      .leftJoin("shahDigital.categories as c", "c.cat_id", "p.cat_id")
      .leftJoin("shahDigital.brands as b", "b.brand_id", "p.brand_id")
      .leftJoin(
        "shahDigital.product_features as pf",
        "pf.product_id",
        "p.product_id",
      )
      .whereNull("p.deleted_at")
      .orderBy("p.product_id", "desc");

    // Get all product ids
    const productIds = [...new Set(products.map((p) => p.product_id))];

    // Fetch product images
    const images = await dbConn("shahDigital.product_media")
      .select("product_id", "media_url")
      .whereIn("product_id", productIds)
      .where("media_type", "image")
      .whereNull("deleted_at")
      .orderBy("media_id", "asc");

    // Fetch condition (New / Refurbished / Used / Open Box) via the existing
    // attributes system - kept separate so it doesn't multiply rows against
    // the product_features left join above
    const conditionAttribute = await dbConn("shahDigital.attributes")
      .where({ attribute_name: "condition", attribute_is_active: 1 })
      .first();

    let conditionByProductId = {};
    if (conditionAttribute) {
      const conditions = await dbConn("shahDigital.product_attributes")
        .select("product_id", "attribute_value", "display_product_attribute")
        .where("attribute_id", conditionAttribute.attribute_id)
        .whereIn("product_id", productIds)
        .whereNull("deleted_at");

      conditionByProductId = conditions.reduce((acc, item) => {
        acc[item.product_id] =
          item.display_product_attribute || item.attribute_value;
        return acc;
      }, {});
    }

    // Group products
    const groupedProducts = Object.values(
      products.reduce((acc, item) => {
        if (!acc[item.product_id]) {
          const productImage = images.find(
            (img) => img.product_id === item.product_id,
          );

          acc[item.product_id] = {
            product_id: item.product_id,
            product_name: item.product_name,
            product_display_name: item.product_display_name,
            short_description: item.short_description,
            full_description: item.full_description,
            product_current_price: item.product_current_price,
            product_discounted_price: item.product_discounted_price,
            product_stock_quantity: item.product_stock_quantity,
            created_at: item.created_at,

            category: {
              cat_id: item.cat_id,
              cat_name: item.cat_name,
              cat_display_name: item.cat_display_name,
            },

            brand: {
              brand_id: item.brand_id,
              brand_name: item.brand_name,
              brand_display_name: item.brand_display_name,
              brand_description: item.brand_description,
              brand_image: item.brand_image,
            },

            image: productImage ? productImage.media_url : null,

            condition: conditionByProductId[item.product_id] || null,

            features: [],
          };
        }

        if (
          item.feature_name &&
          !acc[item.product_id].features.includes(item.feature_name)
        ) {
          acc[item.product_id].features.push(item.feature_name);
        }

        return acc;
      }, {}),
    );

    return res.status(200).json({
      success: true,
      data: groupedProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listProductsAdmin;
