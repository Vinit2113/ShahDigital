const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const deleteProductFeature = async (req, res) => {
  try {
    const featureId = Number(req.params.feature_id);

    if (!featureId) {
      return throwError("Feature ID required", 400);
    }

    const existingFeature = await dbConn("shahDigital.product_features")
      .where({
        feature_id: featureId,
      })
      .whereNull("deleted_at")
      .first();

    if (!existingFeature) {
      return throwError("Product feature not found", 404);
    }

    await dbConn("shahDigital.product_features")
      .where({
        feature_id: featureId,
      })
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      });

    return res.status(200).json({
      message: "Product feature deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = deleteProductFeature;
