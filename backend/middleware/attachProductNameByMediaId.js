const dbConn = require("../db/knex");
const throwError = require("../utils/WebError");

const attachProductNameByMedia = async (req, res, next) => {
  try {
    const mediaId = Number(req.params.media_id);

    const media = await dbConn("shahDigital.product_media as pm")
      .join("shahDigital.products as p", "pm.product_id", "p.product_id")
      .where({
        "pm.media_id": mediaId,
        "p.is_active": 1,
      })
      .whereNull("p.deleted_at")
      .select("p.product_display_name")
      .first();

    if (!media) {
      throwError("Media not found", 404);
    }

    req.productName = media.product_display_name;

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = attachProductNameByMedia;
