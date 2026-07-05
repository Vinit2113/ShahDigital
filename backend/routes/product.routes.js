const express = require("express");
const createProducts = require("../controllers/products/createProducts.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const router = express.Router();

// CREATE
router.post(
  "/insert/cat-:cat_id/brand-:brand_id",
  verifyToken,
  onlyAdmins,
  createProducts,
);

module.exports = router;
