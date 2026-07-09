const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const insertProductMedia = async (req, res) => {
  const trx = await dbConn.transaction();
  try {
    const productId = Number(req.params.product_id);
    const productFile = req.files;

    if (isNaN(productId)) {
      throwError("Product Id must be a number", 400);
    }

    if (!productFile || productFile.length === 0) {
      throwError("Atleast single image required", 400);
    }

    //   CHECK IF PRODUCT EXISTS ON THIS ID
    const existsProduct = await dbConn("shahDigital.products")
      .where({
        product_id: productId,
        is_active: 1,
        deleted_at: null,
      })
      .first();

    if (!existsProduct) {
      throwError("Prodcut not found", 404);
    }

    const images = req.files?.product_image || [];
    const videos = req.files?.product_video || [];

    if (images.length === 0 && videos.length === 0) {
      throwError("At least one image or video is required", 400);
    }
    const mediaData = [];
    let order = 1;
    //   STORE IMAGE
    images.forEach((image) => {
      mediaData.push({
        product_id: productId,
        media_type: "image",
        media_url: `/uploads/products/images/${image.filename}`,
        alt_text: req.body.alt_text || null,
        display_order: order++,
      });
    });

    //   STORE VIDEO
    if (videos.length > 0) {
      mediaData.push({
        product_id: productId,
        media_type: "video",
        media_url: `/uploads/products/videos/${videos[0].filename}`,
        alt_text: req.body.alt_text || null,
        display_order: order++,
      });
    }

    //   INSERT INTO DATABASE
    await trx("shahDigital.product_media").insert(mediaData);
    await trx.commit();

    //   IF EXSITS STORE THE ID CONNECTED TO THAT PRODUCTS IN THIS PRODUCT MEDIA

    return res.status(200).json({
      success: true,
      message: "Product media uploaded successfully",
      data: mediaData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "INTERNAL SERVER ERROR" });
  }
};

module.exports = insertProductMedia;
