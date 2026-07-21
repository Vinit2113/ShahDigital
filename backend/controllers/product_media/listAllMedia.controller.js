const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const listAllMedia = async (req, res) => {
  try {
    const media = await dbConn("shahDigital.product_media")
      .select(
        "media_id",
        "product_id",
        "media_type",
        "media_url",
        "alt_text",
        "display_order",
        "created_at",
        "updated_at",
      )
      .whereNull("deleted_at") // Show only active media
      .orderBy("product_id", "asc")
      .orderBy("display_order", "asc");

    if (!media || media.length === 0) {
      throwError("No product media found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Product media fetched successfully",
      total: media.length,
      data: media,
    });
  } catch (error) {
    console.log("List Media Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listAllMedia;
