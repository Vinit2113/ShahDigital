const express = require("express");
const verifyToken = require("../utils/verifyToken");
const createAddress = require("../controllers/user_address/createUserAddress.controller");

const updateAddress = require("../controllers/user_address/updateUserAddress.controller");

const getUserAddress = require("../controllers/user_address/listByIdUserAddress.controller");
const deleteAddress = require("../controllers/user_address/softDeleteUserAddress.controller");

const router = express.Router();

router.post("/add/", verifyToken, createAddress);
router.post("/show/", verifyToken, getUserAddress);
router.post("/edit/:address_id", verifyToken, updateAddress);
router.post("/delete/:address_id", verifyToken, deleteAddress);

module.exports = router;
