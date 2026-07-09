const express = require("express");
const createProducts = require("../controllers/products/createProducts.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const listProductsAdmin = require("../controllers/products/listAllProducts.controller");
const updateProduct = require("../controllers/products/updateProducts.controller");
const deleteProduct = require("../controllers/products/softDeleteProducts.controller");
const restoreProduct = require("../controllers/products/restoreDeletedProducts.controller");
const catalogueList = require("../controllers/products/catalogueList.controller");
const router = express.Router();

// CREATE
router.post(
  "/insert/cat-:cat_id/brand-:brand_id",
  verifyToken,
  onlyAdmins,
  createProducts,
);

router.post("/admin-list", verifyToken, onlyAdmins, listProductsAdmin);

router.post(
  "/update-product-:product_id",
  verifyToken,
  onlyAdmins,
  updateProduct,
);

router.post(
  "/delete-product-:product_id",
  verifyToken,
  onlyAdmins,
  deleteProduct,
);

router.post(
  "/restore-product-:product_id",
  verifyToken,
  onlyAdmins,
  restoreProduct,
);

// PRODUCT CATALOGUE LIST CODE !
router.post("/catalogue/list", catalogueList  );

module.exports = router;
