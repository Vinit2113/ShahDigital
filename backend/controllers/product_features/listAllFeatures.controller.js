const dbConn = require("../../db/knex");
const existingProductQuery = require("../../services/product.servics");

const throwError = require("../../utils/WebError");

const listFeaturesByProductId = async (req, res) => {
  try {
    const productId = Number(req.params.product_id);

    //   CHECK IF PRODUCT ID IS THERE OR NOT ?
    if (!productId) {
      return throwError("Product id required", 400);
    }

    //   CHECK IF PRODUCT EXISTS OR NOT
    await existingProductQuery(productId);

    const features = await dbConn("shahDigital.product_features")
      .select("feature_id", "feature_name")
      .where({
        product_id: productId,
      })
      .whereNull("deleted_at");

    return res.status(200).json({
      message: "List of all the product's feature",
      data: features,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listFeaturesByProductId;
