const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const {
      cat_id,
      brand_id,
      product_name,
      short_description,
      full_description,
      product_current_price,
      product_discounted_price,
      product_stock_quantity,
      is_active,
    } = req.body;

    const productId = Number(product_id);

    if (Number.isNaN(productId)) {
      throwError("Invalid product id", 400);
    }

    const existingProduct = await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .first();

    if (!existingProduct) {
      throwError("Product not found", 404);
    }

    const updateData = {};

    if (cat_id !== undefined) updateData.cat_id = cat_id;
    if (brand_id !== undefined) updateData.brand_id = brand_id;

    if (product_name !== undefined) {
      const trimmed = product_name.trim();
      updateData.product_name = trimmed.toLowerCase();
      updateData.product_display_name = trimmed;
    }

    if (short_description !== undefined)
      updateData.short_description = short_description;

    if (full_description !== undefined)
      updateData.full_description = full_description;

    if (product_current_price !== undefined)
      updateData.product_current_price = parseFloat(product_current_price);

    if (product_discounted_price !== undefined)
      updateData.product_discounted_price = parseFloat(
        product_discounted_price,
      );

    if (product_stock_quantity !== undefined)
      updateData.product_stock_quantity = parseInt(product_stock_quantity, 10);

    if (is_active !== undefined) updateData.is_active = is_active;

    updateData.updated_at = dbConn.fn.now();

    await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .update(updateData);

    const updatedProduct = await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .first();

    return res.status(200).json({
      message: "Product updated successfully",
      Product: updatedProduct,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateProduct;
