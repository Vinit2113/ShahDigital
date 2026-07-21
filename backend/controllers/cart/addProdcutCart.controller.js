const dbConn = require("../../db/knex");

const addToCart = async (req, res) => {
  try {
    // USER ID FROM JWT TOKEN
    const user_id = req.user.id;

    // DEFAULT QUANTITY = 1
    const { product_id, quantity = 1 } = req.body;

    // VALIDATE PRODUCT ID
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // VALIDATE QUANTITY
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    // CHECK PRODUCT EXISTS
    const product = await dbConn("shahDigital.products")
      .select(
        "product_id",
        "product_name",
        "product_stock_quantity",
        "is_active",
      )
      .where("product_id", product_id)
      .whereNull("deleted_at")
      .first();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // CHECK PRODUCT ACTIVE
    if (!product.is_active) {
      return res.status(400).json({
        success: false,
        message: "Product is not available",
      });
    }

    // CHECK STOCK FOR REQUESTED QUANTITY
    if (product.product_stock_quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient product stock",
      });
    }

    // CHECK IF PRODUCT ALREADY EXISTS IN CART
    const existingCartItem = await dbConn("shahDigital.cart")
      .where({
        user_id,
        product_id,
      })
      .whereNull("deleted_at")
      .first();

    let cartData;

    if (existingCartItem) {
      // UPDATE CART QUANTITY
      const newQuantity = existingCartItem.quantity + quantity;

      // CHECK STOCK AGAINST TOTAL CART QUANTITY
      if (newQuantity > product.product_stock_quantity) {
        return res.status(400).json({
          success: false,
          message: "Cart quantity exceeds available stock",
        });
      }

      await dbConn("shahDigital.cart")
        .where("cart_id", existingCartItem.cart_id)
        .update({
          quantity: newQuantity,
          updated_at: dbConn.fn.now(),
        });

      cartData = await dbConn("shahDigital.cart")
        .where("cart_id", existingCartItem.cart_id)
        .first();
    } else {
      // INSERT NEW CART ITEM
      const [cart_id] = await dbConn("shahDigital.cart").insert({
        user_id,
        product_id,
        quantity,
        added_at: dbConn.fn.now(),
      });

      cartData = await dbConn("shahDigital.cart")
        .where("cart_id", cart_id)
        .first();
    }

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      data: cartData,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

module.exports = addToCart;
