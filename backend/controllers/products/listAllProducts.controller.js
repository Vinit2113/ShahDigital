const dbConn = require("../../db/knex");

const listProducts = async (req, res) => {
  try {
    /**
     * SELECT p.product_display_name, p.product_name, p.short_description, p.full_description, p.product_current_price, p.product_discounted_price, p.product_stock_quantity, b.brand_name, b.brand_display_name, b.brand_description, c.cat_name, c.cat_display_name
     * FROM it_ecomm.products as p
     * INNER JOIN it_ecomm.categories as c ON c.cat_id = p.cat_id
     * INNER JOIN it_ecomm.brands as b ON b.brand_id = p.brand_id
     * WHRE c.cat_is_active AND p.is_active = 1
     */
    const products = await dbConn("it_ecomm.products as p");
  } catch (error) {
    console.log(error);
  }
};
