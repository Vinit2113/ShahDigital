const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

// Updates the catalogue-facing fields of a product only - deliberately
// never reads product_current_price/product_discounted_price/
// product_stock_quantity from req.body, even if a caller sends them, so
// this endpoint can never touch pricing/stock. Pricing/stock stay
// exclusively editable via updateProducts.controller.js (Products
// section). Both write to the same shahDigital.products row.
const updateCatalogueProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const { cat_id, brand_id, product_name, short_description, full_description } =
      req.body;

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

    updateData.updated_at = dbConn.fn.now();

    await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .update(updateData);

    const updatedProduct = await dbConn("shahDigital.products")
      .select(
        "product_id",
        "cat_id",
        "brand_id",
        "product_name",
        "product_display_name",
        "short_description",
        "full_description",
        "is_active",
        "created_at",
      )
      .where({ product_id: productId })
      .first();

    return res.status(200).json({
      message: "Catalogue product updated successfully",
      Product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateCatalogueProduct;
