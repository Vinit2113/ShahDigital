const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");
const { sanitizeName } = require("../../middleware/uploads");

const insertProductMedia = async (req, res) => {
  const trx = await dbConn.transaction();

  try {
    const productId = Number(req.params.product_id);

    if (isNaN(productId)) {
      throwError("Product Id must be a number", 400);
    }

    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      throwError("At least one image or video is required", 400);
    }

    // CHECK PRODUCT EXISTS
    const existsProduct = await dbConn("shahDigital.products")
      .where({
        product_id: productId,
        is_active: 1,
        deleted_at: null,
      })
      .first();

    if (!existsProduct) {
      throwError("Product not found", 404);
    }

    const mediaData = [];
    let order = 1;


    const safeProductName = sanitizeName(existsProduct.product_display_name);

    // MERGE ALL UPLOADED FILES
    const uploadedFiles = [
      ...(files.product_image || []),
      ...(files.product_video || []),
    ];

    uploadedFiles.forEach((file) => {
      let mediaType;

      // IMAGE CHECK
      if (
        file.fieldname === "product_image" ||
        file.mimetype.startsWith("image/")
      ) {
        mediaType = "image";
      }

      // VIDEO CHECK
      else if (
        file.fieldname === "product_video" ||
        file.mimetype.startsWith("video/")
      ) {
        mediaType = "video";
      } else {
        throwError("Invalid media type", 400);
      }

      let mediaPath;

      if (mediaType === "image") {
        mediaPath = `/uploads/products/images/${safeProductName}/${file.filename}`;
      } else {
        mediaPath = `/uploads/products/videos/${safeProductName}/${file.filename}`;
      }

      mediaData.push({
        product_id: productId,
        media_type: mediaType,
        media_url: mediaPath,
        alt_text: req.body.alt_text || null,
        display_order: order++,
      });
    });

    await trx("shahDigital.product_media").insert(mediaData);

    await trx.commit();

    return res.status(200).json({
      success: true,
      message: "Product media uploaded successfully",
      data: mediaData,
    });
  } catch (error) {
    await trx.rollback();

    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = insertProductMedia;
