const dbConn = require("../db/knex");
const throwError = require("../utils/WebError");

const existingProductQuery = async (productId) => {
  console.log("Services Product Idproduct", productId);

  const product = await dbConn("shahDigital.products")
    .where({
      product_id: productId,
    })
    .whereNull("deleted_at")
    .first();

  if (!product) {
    return throwError("Product dosen't exists", 404);
  }

  return product;
};
module.exports = existingProductQuery;
