const express = require("express");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const addAttributeToCategory = require("../controllers/cat_attribute/addAttributeToCategory.controller");
const listMappedCatAt = require("../controllers/cat_attribute/listMappedCatAttribute.controller");
const { adminWriteLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

// CREATE
router.post(
  "/map/cat_attribute",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  addAttributeToCategory,
);

router.post("/list/map-catat/:cat_id", listMappedCatAt);
module.exports = router;
