const dbConn = require("../../db/knex");

const listProductsAdmin = async (req, res) => {
  try {
    /**
     * SELECT p.product_display_name, p.product_name, p.short_description, p.full_description, p.product_current_price, p.product_discounted_price, p.product_stock_quantity, b.brand_name, b.brand_display_name, b.brand_description, c.cat_name, c.cat_display_name
     * FROM shahDigital.products as p
     * INNER JOIN shahDigital.categories as c ON c.cat_id = p.cat_id
     * INNER JOIN shahDigital.brands as b ON b.brand_id = p.brand_id
     * WHRE c.cat_is_active AND p.is_active = 1
     */

    const products = await dbConn("shahDigital.products as p")
      .select(
        "c.cat_name",
        "c.cat_display_name",
        "b.brand_name",
        "b.brand_display_name",
        "b.brand_description",
        "p.product_display_name",
        "p.product_name",
        "p.short_description",
        "p.full_description",
        "p.product_current_price",
        "p.product_discounted_price",
        "p.product_stock_quantity",
      )
      .join("shahDigital.categories as c", "c.cat_id", "p.cat_id")
      .join("shahDigital.brands as b", "b.brand_id", "p.brand_id")
      .andWhere("c.cat_is_active", 1);

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listProductsAdmin;
