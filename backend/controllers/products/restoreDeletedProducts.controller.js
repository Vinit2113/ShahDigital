const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const restoreProduct = async (req, res) => {
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
      .first();

    if (!existsProducts) {
      throwError("Product not found or already deleted", 404);
    }

    //   CHECK IF PRODUCT IS ALREADY ACTIVE
    if (
      existsProducts.deleted_at === null &&
      existsProducts.is_active === true
    ) {
      throwError("Product is already active", 400);
    }

    //    RESTORE SOFT DELETE PRODUCT
    await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .update({
        deleted_at: null,
        is_active: true,
        updated_at: dbConn.fn.now(),
      });

    return res.status(200).json({ message: "Product restored successfully" });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = restoreProduct;
