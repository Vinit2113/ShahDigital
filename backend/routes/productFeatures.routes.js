const express = require("express");
const createProducts = require("../controllers/products/createProducts.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const insertProductFeatures = require("../controllers/product_features/createProductFeatures.controller");
const listFeaturesByProductId = require("../controllers/product_features/listAllFeatures.controller");
const updateSingleFeature = require("../controllers/product_features/updateProductFeatures.controller");
const deleteProductFeature = require("../controllers/product_features/softDeleteProductFeature.controller");

const router = express.Router();

// CREATE
router.post(
  "/insert/:product_id",
  verifyToken,
  onlyAdmins,
  insertProductFeatures,
);

router.post("/list-features/:product_id", listFeaturesByProductId);

router.post("/update-features/:feature_id", updateSingleFeature);
router.post("/delete-features/:feature_id", deleteProductFeature);

module.exports = router;
