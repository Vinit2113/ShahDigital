const dbConn = require("../db/knex");
const throwError = require("../utils/WebError");
const attachProductName = async (req, res, next) => {
  try {
    const productId = Number(req.params.product_id);

    if (Number.isNaN(productId)) {
      return throwError("Invalid product id", 400);
    }

    const product = await dbConn("shahDigital.products")
      .where({
        product_id: productId,
        is_active: 1,
      })
      .whereNull("deleted_at")
      .first();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Store it on req directly
    req.productName = product.product_display_name;

    next();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = attachProductName;
