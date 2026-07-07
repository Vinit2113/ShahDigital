const express = require("express");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const createProductAttribute = require("../controllers/product_attributes/createProductAttribute.controller");
const listProductAttributes = require("../controllers/product_attributes/listProductAttribute.controller");
const getProductAttributeById = require("../controllers/product_attributes/getProductAttribute.controller");
const updateProductAttribute = require("../controllers/product_attributes/updateProductAttribute.controller");
const deleteProductAttribute = require("../controllers/product_attributes/softDeleteProductAttribute.controller");

const router = express.Router();

// CREATE
router.post("/insert/", verifyToken, onlyAdmins, createProductAttribute);
router.post("/list/", verifyToken, onlyAdmins, listProductAttributes);

router.post(
  "/get-:product_attribute_id/",
  verifyToken,
  onlyAdmins,
  getProductAttributeById,
);

router.post(
  "/update/:product_attribute_id",
  verifyToken,
  onlyAdmins,
  updateProductAttribute,
);

router.post(
  "/delete/:product_attribute_id",
  verifyToken,
  onlyAdmins,
  deleteProductAttribute,
);

module.exports = router;
