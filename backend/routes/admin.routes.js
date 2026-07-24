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
const {
  loginLimiter,
  adminWriteLimiter,
} = require("../middleware/rateLimit.middleware");
const router = express.Router();

// AUTH

// Only an already-logged-in admin/owner can create another admin account -
// this was previously wide open (no auth check at all), letting anyone who
// found this endpoint register themselves a full admin account.
router.post(
  "/register",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  registerAdmin,
);
router.post("/login", loginLimiter, loginAdmin);
router.post("/logout", logouAdmin);

// LIST ALL USER'S PROFILE
router.get("/list-users", verifyToken, onlyAdmins, listAllProfile);

// BLOCK USER
router.post("/:userid/block", verifyToken, onlyAdmins, userBlock);

// DELETE SPECIFIC USER
router.post("/:id/user-delete", verifyToken, onlyAdmins, deleteUser);

module.exports = router;
