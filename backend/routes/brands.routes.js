const express = require("express");
const createBrands = require("../controllers/brands/createBrands.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const listBrands = require("../controllers/brands/listAllBrands.controller");
const brandById = require("../controllers/brands/brandsById.controller");
const updateBrandById = require("../controllers/brands/updateBrandById.controller");
const deleteBrandById = require("../controllers/brands/deleteBrandById.controller");
const restoreDeletedBrandById = require("../controllers/brands/restoreDeletedBrandById.controller");
const listAdminBrands = require("../controllers/brands/listAdminBrands.controller");
const { brandStorage } = require("../middleware/uploads");
const { adminWriteLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

// CREATE
router.post(
  "/create-brand",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  brandStorage.single("brand_image"),
  createBrands,
);

// LISTS
router.post("/list-All", listBrands);
router.post("/show/:brand_id", brandById);

router.post("/list-admin", verifyToken, onlyAdmins, listAdminBrands);

// UPDATE
router.post(
  "/update/:brand_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  brandStorage.single("brand_image"),
  updateBrandById,
);

// DELETE
router.post(
  "/delete/:brand_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  deleteBrandById,
);

// RESTORE
router.post(
  "/restore/:brand_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  restoreDeletedBrandById,
);

module.exports = router;
