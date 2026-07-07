const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");


const createProductAttribute = async (req, res) => {
  try {
    const { product_id, attribute_id, attribute_value } = req.body;

    // 1. VALIDATION
    if (!product_id || !attribute_id || !attribute_value) {
      throwError(
        "product_id, attribute_id and attribute_value are required",
        400,
      );
    }

    const trimmedValue = attribute_value.trim();
    const normalizedValue = trimmedValue.toLowerCase();

    // 2. CHECK PRODUCT EXISTS (REQUIRED CONDITION)
    const productExists = await dbConn("shahDigital.products")
      .where({
        product_id: product_id,
        is_active: true,
      })
      .whereNull("deleted_at")
      .first();

    if (!productExists) {
      throwError("Product not found or inactive", 404);
    }

    // 3. CHECK ATTRIBUTE EXISTS
    const attributeExists = await dbConn("shahDigital.attributes")
      .where({
        attribute_id: attribute_id,
        attribute_is_active: true,
      })
      .first();

    if (!attributeExists) {
      throwError("Attribute not found or inactive", 404);
    }

    // 4. CHECK DUPLICATE LINK
    const existingLink = await dbConn("shahDigital.product_attributes")
      .where({
        product_id,
        attribute_id,
        attribute_value: normalizedValue,
      })
      .whereNull("deleted_at")
      .first();

    if (existingLink) {
      throwError("Product attribute already exists", 409);
    }

    // 5. INSERT LINK
    await dbConn("shahDigital.product_attributes").insert({
      product_id,
      attribute_id,
      attribute_value: normalizedValue,
      display_product_attribute: trimmedValue,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // 6. RESPONSE
    return res.status(201).json({
      message: "Product attribute linked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = createProductAttribute;
