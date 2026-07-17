const express = require("express");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const cat_by_id = require("../controllers/categories/categoryById.controller");
const createCategory = require("../controllers/categories/createCategories.controller");
const listCategories = require("../controllers/categories/listAllCategories.controller");
const updateCatById = require("../controllers/categories/updateCategoryById.controller");
const deleteCatById = require("../controllers/categories/deleteCatById.controller");
const restoreCatById = require("../controllers/categories/restoreCatById.controller");
const listCatAdmin = require("../controllers/categories/listForAdminCategory.controller");
const listActiveCategories = require("../controllers/categories/catActiveList.controller");

const router = express.Router();

// CREATE
router.post("/cat-insert", verifyToken, onlyAdmins, createCategory);

// LISTS
router.post("/cat-list", listCategories);
router.post("/cat-list-id/:cat_id", cat_by_id);

// UPDATE
router.post("/cat-update-id/:cat_id", verifyToken, onlyAdmins, updateCatById);

// DELETE
router.post("/cat-delete-id/:cat_id", verifyToken, onlyAdmins, deleteCatById);

// RESTORE
router.post("/cat-restore-id/:cat_id", verifyToken, onlyAdmins, restoreCatById);

// LIST FOR ADMIN
router.post("/cat-list-admin/", verifyToken, onlyAdmins, listCatAdmin);

router.post("/cat-active-list/", verifyToken, onlyAdmins, listActiveCategories);

module.exports = router;
