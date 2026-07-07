const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const deleteProductAttribute = async (req, res) => {
  try {
    const { product_attribute_id } = req.params;
    console.log("Here is id", product_attribute_id);

    // 1. VALIDATION
    if (!product_attribute_id) {
      throwError("product_attribute_id is required", 400);
    }

    // 2. CHECK PRODUCT ATTRIBUTE EXISTS
    const productAttributeExists = await dbConn(
      "shahDigital.product_attributes",
    )
      .where({
        product_attribute_id: product_attribute_id,
      })
      .whereNull("deleted_at")
      .first();

    if (!productAttributeExists) {
      throwError("Product attribute not found or already deleted", 404);
    }

    // 3. SOFT DELETE
    await dbConn("shahDigital.product_attributes")
      .where({
        product_attribute_id: product_attribute_id,
      })
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      });

    // 4. RESPONSE
    return res.status(200).json({
      message: "Product attribute deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = deleteProductAttribute;
