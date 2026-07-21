const express = require("express");
const registerAdmin = require("../controllers/admin/adminRegister.controller");
const loginAdmin = require("../controllers/admin/adminLogin.controller");
const {
  listAllProfile,
} = require("../controllers/admin/listAllUser.controller");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const userBlock = require("../controllers/admin/blockUser.controller");
const {
  deleteUser,
} = require("../controllers/admin/deleteUserByAdmin.controller");
const logouAdmin = require("../controllers/admin/adminLogout.controller");
const { loginLimiter } = require("../middleware/rateLimit.middleware");
const router = express.Router();

// AUTH

router.post("/admin-auth-register", verifyToken, onlyAdmins, registerAdmin);
router.post("/admin-auth-login", loginLimiter, loginAdmin);
router.post("/admin-auth-logout", logouAdmin);

// LIST ALL USER'S PROFILE
router.get("/admin-list-users", verifyToken, onlyAdmins, listAllProfile);

// BLOCK USER
router.post("/:userid/block", verifyToken, onlyAdmins, userBlock);

// DELETE SPECIFIC USER
router.post("/:id/user-delete", verifyToken, onlyAdmins, deleteUser);

module.exports = router;
