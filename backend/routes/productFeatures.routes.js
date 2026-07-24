const express = require("express");
const createProducts = require("../controllers/products/createProducts.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const insertProductFeatures = require("../controllers/product_features/createProductFeatures.controller");
const listFeaturesByProductId = require("../controllers/product_features/listAllFeatures.controller");
const updateSingleFeature = require("../controllers/product_features/updateProductFeatures.controller");
const deleteProductFeature = require("../controllers/product_features/softDeleteProductFeature.controller");
const { adminWriteLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

// CREATE
router.post(
  "/insert/:product_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  insertProductFeatures,
);

router.post("/list-features/:product_id", listFeaturesByProductId);

router.post(
  "/update-features/:feature_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  updateSingleFeature,
);
router.post(
  "/delete-features/:feature_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  deleteProductFeature,
);

module.exports = router;
