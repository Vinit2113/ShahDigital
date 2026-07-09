const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const updateSingleFeature = async (req, res) => {
  try {
    const featureId = Number(req.params.feature_id);

    const { product_id, feature_name } = req.body || {};

    if (!featureId) {
      return throwError("Feature ID required", 400);
    }

    // Check feature exists
    const existingFeature = await dbConn("shahDigital.product_features")
      .where({
        feature_id: featureId,
      })
      .whereNull("deleted_at")
      .first();

    if (!existingFeature) {
      return throwError("Feature not found", 404);
    }

    const updateData = {
      updated_at: new Date(),
    };

    // Update product connection
    if (product_id) {
      updateData.product_id = Number(product_id);
    }

    // Update feature name
    if (feature_name) {
      updateData.feature_name = feature_name;
    }

    await dbConn("shahDigital.product_features")
      .where({
        feature_id: featureId,
      })
      .update(updateData);

    return res.status(200).json({
      message: "Feature updated successfully",
      data: updateData,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateSingleFeature;
