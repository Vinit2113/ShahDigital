const dbConn = require("../../db/knex");
const existingProductQuery = require("../../services/product.servics");
const throwError = require("../../utils/WebError");

const insertProductFeatures = async (req, res) => {
  try {
    const productId = Number(req.params.product_id);
    const { feature_name } = req.body || {};

    feature_name.forEach((element) => {
      console.log("------------", element);
    });

    // VALID PRODUCT ID OR NOT !?
    if (!Array.isArray(feature_name) || feature_name.length === 0) {
      return throwError("Feature name requried", 400);
    }

    if (!productId) {
      return throwError("Product ID requried ", 400);
    }

    //   IMPORT EXISTING PRODUCT FUNCTIUONALITY
    await existingProductQuery(productId);

    // MULTIPLE FEATURES FOR SINGLE PRODUCT
    const featursInsert = feature_name.map((feature) => ({
      product_id: productId,
      feature_name: feature,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    // BULK INSERT
    await dbConn("shahDigital.product_features").insert(featursInsert);

    return res
      .status(200)
      .json({ message: "Features added to product successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "INTERNAL SERVER ERROR" });
  }
};

module.exports = insertProductFeatures;
