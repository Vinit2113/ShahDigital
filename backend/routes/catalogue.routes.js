const express = require("express");
const catalogueList = require("../controllers/catalogue/catalogueList.controller");
const listAdminCatalogue = require("../controllers/catalogue/listAdminCatalogue.controller");
const createCatalogueProduct = require("../controllers/catalogue/createCatalogueProduct.controller");
const updateCatalogueProduct = require("../controllers/catalogue/updateCatalogueProduct.controller");

const deleteProduct = require("../controllers/products/softDeleteProducts.controller");
const restoreProduct = require("../controllers/products/restoreDeletedProducts.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const { adminWriteLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post("/list", catalogueList);

router.post("/admin-list", verifyToken, onlyAdmins, listAdminCatalogue);

router.post(
  "/insert/cat-:cat_id/brand-:brand_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  createCatalogueProduct,
);

router.post(
  "/update-:product_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  updateCatalogueProduct,
);

router.post(
  "/delete-:product_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  deleteProduct,
);

router.post(
  "/restore-:product_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  restoreProduct,
);

module.exports = router;
