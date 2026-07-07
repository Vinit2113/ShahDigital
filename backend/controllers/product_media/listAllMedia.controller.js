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
      )
      .orderBy("created_at", "desc");
    if (!media || media.length === 0) {
      throwError("No product media found", 404);
    }
    return res.status(200).json({
      message: "Product media fetched successfully",
      Total: media.length,
      data: media,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "INTERNAL SERVER ERROR" });
  }
};

module.exports = listAllMedia;
