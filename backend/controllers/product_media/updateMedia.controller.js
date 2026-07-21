const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");
const fs = require("fs");
const { sanitizeName } = require("../../middleware/uploads");

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

    if (req.body.alt_text !== undefined) {
      updateData.alt_text = req.body.alt_text;
    }

    if (req.body.display_order !== undefined) {
      updateData.display_order = Number(req.body.display_order);
    }


    const safeProductName = sanitizeName(req.productName);

    const deleteOldFile = (mediaUrl) => {
      const oldPath = mediaUrl.replace(/^\//, "");

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    };

    /*
        UPDATE IMAGE
    */
    if (req.files?.product_image && req.files.product_image.length > 0) {
      const image = req.files.product_image[0];

      // CHANGED: includes the per-product subfolder now, matching the
      // new Multer destination (see createMedia.controller.js for the
      // same change on the create path).
      updateData.media_type = "image";
      updateData.media_url = `/uploads/products/images/${safeProductName}/${image.filename}`;

      if (existingMedia.media_type === "image") {
        deleteOldFile(existingMedia.media_url);
      }
    }

    /*
        UPDATE VIDEO
    */
    if (req.files?.product_video && req.files.product_video.length > 0) {
      const video = req.files.product_video[0];

      updateData.media_type = "video";
      updateData.media_url = `/uploads/products/videos/${safeProductName}/${video.filename}`;

      if (existingMedia.media_type === "video") {
        deleteOldFile(existingMedia.media_url);
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
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateProductMedia;
