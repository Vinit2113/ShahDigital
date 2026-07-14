const express = require("express");
const verifyToken = require("../utils/verifyToken");
const addToCart = require("../controllers/cart/addProdcutCart.controller");
const router = express.Router();

router.post("/added-cart", verifyToken, addToCart);

module.exports = router;
