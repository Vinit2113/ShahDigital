const dbConn = require("../../db/knex");

const getProductById = async (req, res) => {
  try {
    const productId = req.params.product_id;

    console.log("Product ID:", productId);

    // Validate product id
    if (!productId || isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid Product ID is required",
      });
    }

    // Get product details
    const product = await dbConn("shahDigital.products as p")
      .select(
        // Product
        "p.product_id",
        "p.product_name",
        "p.product_display_name",
        "p.short_description",
        "p.full_description",
        "p.product_current_price",
        "p.product_discounted_price",
        "p.product_stock_quantity",
        "p.is_active",
        "p.created_at",

        // Category
        "c.cat_id",
        "c.cat_name",
        "c.cat_display_name",

        // Brand
        "b.brand_id",
        "b.brand_name",
        "b.brand_display_name",
        "b.brand_description",
        "b.brand_image",

        // Features
        "pf.feature_name",
      )

      .leftJoin("shahDigital.categories as c", "c.cat_id", "p.cat_id")

      .leftJoin("shahDigital.brands as b", "b.brand_id", "p.brand_id")

      .leftJoin(
        "shahDigital.product_features as pf",
        "pf.product_id",
        "p.product_id",
      )

      .where("p.product_id", productId)
      .whereNull("p.deleted_at")
      .where("p.is_active", 1);

    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Get product media
    const media = await dbConn("shahDigital.product_media")
      .select(
        "media_id",
        "media_type",
        "media_url",
        "alt_text",
        "display_order",
      )
      .where("product_id", productId)
      .whereNull("deleted_at")
      .orderBy("display_order", "asc");

    console.log("Product Media:", media);

    const item = product[0];

    const productDetails = {
      product_id: item.product_id,

      product_name: item.product_name,

      product_display_name: item.product_display_name,

      short_description: item.short_description,

      full_description: item.full_description,

      price: {
        current: item.product_current_price,
        discounted: item.product_discounted_price,
      },

      stock_quantity: item.product_stock_quantity,

      is_active: Boolean(item.is_active),

      created_at: item.created_at,

      category: {
        id: item.cat_id,
        name: item.cat_name,
        display_name: item.cat_display_name,
      },

      brand: {
        id: item.brand_id,
        name: item.brand_name,
        display_name: item.brand_display_name,
        description: item.brand_description,
        image: item.brand_image,
      },

      features: [
        ...new Set(product.map((p) => p.feature_name).filter(Boolean)),
      ],

      // Product Images
      images: media
        .filter((m) => m.media_type && m.media_type.toLowerCase() === "image")
        .map((m) => ({
          id: m.media_id,
          url: m.media_url,
          alt_text: m.alt_text,
          display_order: m.display_order,
        })),

      // Product Videos
      videos: media
        .filter((m) => m.media_type && m.media_type.toLowerCase() === "video")
        .map((m) => ({
          id: m.media_id,
          url: m.media_url,
          display_order: m.display_order,
        })),
    };

    return res.status(200).json({
      success: true,
      data: productDetails,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = getProductById;
