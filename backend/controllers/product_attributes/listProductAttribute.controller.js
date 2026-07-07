const dbConn = require("../../db/knex");

const listProductAttributes = async (req, res) => {
  try {
    const { product_id, attribute_id } = req.query;

    let query = dbConn("shahDigital.product_attributes")
      .select(
        "product_attributes.product_attribute_id",
        "product_attributes.product_id",
        "product_attributes.attribute_id",
        "product_attributes.attribute_value",
        "product_attributes.display_product_attribute",
        "product_attributes.created_at",
        "product_attributes.deleted_at",
        "products.product_name",
        "attributes.attribute_name",
      )
      .leftJoin(
        "shahDigital.products as products",
        "product_attributes.product_id",
        "products.product_id",
      )
      .leftJoin(
        "shahDigital.attributes as attributes",
        "product_attributes.attribute_id",
        "attributes.attribute_id",
      )
      .orderBy("product_attributes.created_at", "desc");

    // optional filters
    if (product_id) {
      query.where("product_attributes.product_id", product_id);
    }

    if (attribute_id) {
      query.where("product_attributes.attribute_id", attribute_id);
    }

    const data = await query;

    return res.status(200).json({
      message: "Product attributes fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listProductAttributes;
