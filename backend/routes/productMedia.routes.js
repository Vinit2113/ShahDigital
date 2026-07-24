const express = require("express");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const verifyToken = require("../utils/verifyToken");
const insertProductMedia = require("../controllers/product_media/createMedia.controller");
const { productStorage } = require("../middleware/uploads");
const attachProductName = require("../middleware/attachProductName.middlewre");
const listAllMedia = require("../controllers/product_media/listAllMedia.controller");
const updateProductMedia = require("../controllers/product_media/updateMedia.controller");
const softDeleteProductMedia = require("../controllers/product_media/deleteMedia.controller");
const attachProductNameByMedia = require("../middleware/attachProductNameByMediaId");
const { adminWriteLimiter } = require("../middleware/rateLimit.middleware");
const router = express.Router();

router.post(
  "/add/:product_id/media",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  attachProductName,
  productStorage.fields([
    { name: "product_image", maxCount: 10 },
    { name: "product_video", maxCount: 1 },
  ]),
  insertProductMedia,
);

router.post("/list/media", verifyToken, onlyAdmins, listAllMedia);

router.post(
  "/update/:media_id/media",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  attachProductNameByMedia,
  productStorage.fields([
    { name: "product_image", maxCount: 10 },
    { name: "product_video", maxCount: 1 },
  ]),
  updateProductMedia,
);

router.post(
  "/delete/:media_id/media",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  softDeleteProductMedia,
);

module.exports = router;
