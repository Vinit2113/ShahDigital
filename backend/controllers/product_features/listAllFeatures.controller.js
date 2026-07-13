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
      .select("feature_name")
      .where({
        product_id: productId,
      })
      .whereNull("deleted_at");

    if (!features || features.length === 0) {
      return throwError("No features found for that product");
    }

    //   INSTEAD OF SEPERAT JSON I USE MAP BECAUSE IT RETURN THE DATA IN ARRAY FORMAT LIKE IF THE DATA IS LIKE DUPLICATE_KEY WITH MULTIPLE VALUE IT'LL MAKE THE KEY SINGLE WITH MULTIPLE VALUE IN ARRAY
    const readableFeatures = await features.map((data) => data.feature_name);

    return res.status(200).json({
      message: "List of all the product's feature",
      data: readableFeatures,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listFeaturesByProductId;
