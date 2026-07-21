const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const deleteProduct = async (req, res) => {
  try {
    // const { product_id } = req.params.product_id;
    const productId = Number(req.params.product_id);

    if (Number.isNaN(productId)) {
      throwError("Invalid product id", 400);
    }

    //   CHECK IF PRODUCT EXISTS OR NOT
    const existsProducts = await dbConn("shahDigital.products")
      .where({
        product_id: productId,
      })
      .whereNull("deleted_at")
      .first();

    if (!existsProducts) {
      throwError("Product not found or already deleted", 404);
    }

    //   2. SOFT DELETE PRODUCT
    await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .update({
        deleted_at: dbConn.fn.now(),
        is_active: false,
        updated_at: dbConn.fn.now(),
      });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = deleteProduct;
