const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const updateProductAttribute = async (req, res) => {
  try {
    const { product_attribute_id } = req.params;
    const { product_id, attribute_id, attribute_value } = req.body;

    if (!product_attribute_id) {
      throwError("product_attribute_id is required", 400);
    }

    // Check record exists
    const existing = await dbConn("shahDigital.product_attributes")
      .where({ product_attribute_id })
      .whereNull("deleted_at")
      .first();

    if (!existing) {
      throwError("Product attribute not found", 404);
    }

    const updateData = {};

    // Update Product
    if (product_id !== undefined) {
      const productExists = await dbConn("shahDigital.products")
        .where({
          product_id,
          is_active: true,
        })
        .whereNull("deleted_at")
        .first();

      if (!productExists) {
        throwError("Product not found or inactive", 404);
      }

      updateData.product_id = product_id;
    }

    // Update Attribute
    if (attribute_id !== undefined) {
      const attributeExists = await dbConn("shahDigital.attributes")
        .where({
          attribute_id,
          attribute_is_active: true,
        })
        .first();

      if (!attributeExists) {
        throwError("Attribute not found or inactive", 404);
      }

      updateData.attribute_id = attribute_id;
    }

    // Update Attribute Value
    if (attribute_value !== undefined) {
      const trimmedValue = attribute_value.trim();

      updateData.attribute_value = trimmedValue.toLowerCase();
      updateData.display_product_attribute = trimmedValue;
    }

    if (Object.keys(updateData).length === 0) {
      throwError("No fields provided to update", 400);
    }

    updateData.updated_at = new Date();

    await dbConn("shahDigital.product_attributes")
      .where({ product_attribute_id })
      .update(updateData);

    return res.status(200).json({
      message: "Product attribute updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateProductAttribute;
