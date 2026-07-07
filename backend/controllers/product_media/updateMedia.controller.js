const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");
const fs = require("fs");
const path = require("path");

const updateProductMedia = async (req, res) => {
  const trx = await dbConn.transaction();

  try {
    const mediaId = Number(req.params.media_id);

    if (Number.isNaN(mediaId)) {
      throwError("Media Id must be a number", 400);
    }

    // FIND EXISTING MEDIA
    const existingMedia = await trx("shahDigital.product_media as pm")
      .join("shahDigital.products as p", "pm.product_id", "p.product_id")
      .where({
        "pm.media_id": mediaId,
        "p.is_active": 1,
      })
      .whereNull("p.deleted_at")
      .select("pm.*")
      .first();

    if (!existingMedia) {
      throwError("Product media not found", 404);
    }

    const updateData = {};

    /*
        UPDATE ALT TEXT
    */
    if (req.body.alt_text !== undefined) {
      updateData.alt_text = req.body.alt_text;
    }

    /*
        UPDATE DISPLAY ORDER
    */
    if (req.body.display_order !== undefined) {
      updateData.display_order = Number(req.body.display_order);
    }

    /*
        UPDATE IMAGE
    */
    if (req.files?.product_image && req.files.product_image.length > 0) {
      const image = req.files.product_image[0];

      updateData.media_type = "image";
      updateData.media_url = image.filename;

      // OPTIONAL DELETE OLD IMAGE
      if (existingMedia.media_type === "image") {
        const oldPath = path.join(
          "uploads/products/images",
          existingMedia.media_url,
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    /*
        UPDATE VIDEO
    */
    if (req.files?.product_video && req.files.product_video.length > 0) {
      const video = req.files.product_video[0];

      updateData.media_type = "video";
      updateData.media_url = video.filename;

      // OPTIONAL DELETE OLD VIDEO
      if (existingMedia.media_type === "video") {
        const oldPath = path.join(
          "uploads/products/videos",
          existingMedia.media_url,
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      throwError("Nothing to update", 400);
    }

    await trx("shahDigital.product_media")
      .where({
        media_id: mediaId,
      })
      .update(updateData);

    await trx.commit();

    const updatedMedia = await dbConn("shahDigital.product_media")
      .where({
        media_id: mediaId,
      })
      .first();

    return res.status(200).json({
      success: true,
      message: "Product media updated successfully",
      data: updatedMedia,
    });
  } catch (error) {
    await trx.rollback();

    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateProductMedia;
