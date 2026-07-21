const dbConn = require("../../db/knex");

const getProductAttributeById = async (req, res) => {
  try {
    const product_attribute_id = req.params.product_attribute_id;

    const data = await dbConn(
      "shahDigital.product_attributes as product_attributes",
    )
      .select(
        "product_attributes.product_attribute_id",
        "product_attributes.product_id",
        "product_attributes.attribute_id",
        "product_attributes.attribute_value",
        "product_attributes.display_product_attribute",
        "product_attributes.created_at",
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
      .where("product_attributes.product_attribute_id", product_attribute_id)
      .whereNull("product_attributes.deleted_at")
      .first();

    if (!data) {
      return res.status(404).json({
        message: "Product attribute not found",
      });
    }

    return res.status(200).json({
      message: "Product attribute fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = getProductAttributeById;
