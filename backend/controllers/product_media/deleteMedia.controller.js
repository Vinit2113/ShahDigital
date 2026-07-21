const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const softDeleteProductMedia = async (req, res) => {
  const trx = await dbConn.transaction();

  try {
    const mediaId = Number(req.params.media_id);
    console.log(mediaId);

    if (isNaN(mediaId)) {
      throwError("Media Id must be a number", 400);
    }

    // CHECK MEDIA EXISTS AND NOT ALREADY DELETED
    const mediaExists = await dbConn("shahDigital.product_media")
      .where({
        media_id: mediaId,
        deleted_at: null,
      })
      .first();

    if (!mediaExists) {
      throwError("Product media not found", 404);
    }

    // SOFT DELETE MEDIA
    await trx("shahDigital.product_media")
      .where({
        media_id: mediaId,
        deleted_at: null,
      })
      .update({
        deleted_at: dbConn.fn.now(),
      });

    await trx.commit();

    return res.status(200).json({
      success: true,
      message: "Product media deleted successfully",
    });
  } catch (error) {
    await trx.rollback();

    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = softDeleteProductMedia;
