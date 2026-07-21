const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const createProducts = async (req, res) => {
  try {
    const { cat_id, brand_id } = req.params;

    const {
      product_name,
      short_description,
      full_description,
      product_current_price,
      product_discounted_price,
      product_stock_quantity,
    } = req.body || "";

    // 1. VALIDARTE FOREIGN KEYS
    const categoryId = Number(cat_id);
    const brandId = Number(brand_id);

    if (Number.isNaN(categoryId)) {
      throwError("Invalid category id", 400);
    }

    if (Number.isNaN(brandId)) {
      throwError("Invalid brand id", 400);
    }

    // 2. VALIDATE REQUIRED BODY FIELDS
    const requiredFields = {
      product_name,
      product_current_price,
      product_stock_quantity,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        throwError(`${key} is required`, 400);
      }
    }

    // 3. NORMALIZE VALUES
    const trimmedProductName = product_name.trim();
    const normalizeProductName = trimmedProductName.toLowerCase();
    const currentPrice = parseFloat(product_current_price);
    const discountedPrice =
      product_discounted_price !== undefined &&
      product_discounted_price !== null &&
      product_discounted_price !== ""
        ? parseFloat(product_discounted_price)
        : null;
    const stockQty = parseInt(product_stock_quantity, 10);

    if (Number.isNaN(currentPrice)) {
      throwError("Current price must be a valid number", 400);
    }
    if (Number.isNaN(stockQty)) {
      throwError("Stock quantity must be a valid integer", 400);
    }

    // 4. PRICING AND QUANTITY RULES
    if (currentPrice < 0) {
      throwError("Price cannot be negative", 400);
    }
    if (discountedPrice !== null && discountedPrice > currentPrice) {
      throwError("Discounted price cannot exceed current price", 400);
    }
    if (stockQty < 0) {
      throwError("Stock quantity cannot be negative", 400);
    }

    //   5. CHECK IF CATEGORY AND BRANDS EXISTS OR NOT
    const existsCategory = await dbConn("shahDigital.categories")
      .where({
        cat_id: categoryId,
      })
      .first();
    if (!existsCategory) {
      throwError("Category not found", 404);
    }

    const existsBrands = await dbConn("shahDigital.brands")
      .where({
        brand_id: brandId,
      })
      .whereNull("deleted_at")
      .first();
    if (!existsBrands) {
      throwError("Brand not found", 404);
    }

    //   6. CHECK BEFORE STORING IF THE PRODUCT IS EXISTS OR NOT !
    const existingProduct = await dbConn("shahDigital.products")
      .where({
        product_name: normalizeProductName,
        brand_id: brandId,
        cat_id: categoryId,
      })
      .whereNull("deleted_at")
      .first();

    if (existingProduct) {
      throwError("Product already exists", 409);
    }

    //   7. IF FOUND STORE THE ID OF THAT CATEGORY AND BRAND WITH THE PRODUCT DETIALS IN DATABASE
    const [productId] = await dbConn("shahDigital.products").insert({
      cat_id: categoryId,
      brand_id: brandId,
      product_name: normalizeProductName,
      product_display_name: trimmedProductName,
      short_description: short_description || null,
      full_description: full_description || null,
      product_current_price: currentPrice,
      product_discounted_price: discountedPrice ?? null,
      product_stock_quantity: stockQty,
      is_active: true,
    });

    //   RETURNING DATA
    const product = await dbConn("shahDigital.products")
      .where({ product_id: productId })
      .first();

    return res.status(201).json({
      message: "Product inserted successfully",
      Product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = createProducts;
