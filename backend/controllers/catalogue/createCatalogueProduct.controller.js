const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

// Creates a product from the Catalogue admin section - deliberately a
// smaller field set than createProducts.controller.js (no pricing/stock
// inputs at all). Writes to the same shahDigital.products table Products
// uses; product_current_price/product_stock_quantity are required NOT NULL
// columns on that table (see migrations/20260703083800_product_table.js),
// so they're defaulted to 0 here and set for real later from the Products
// section - the public catalogue query never selects price/stock anyway.
const createCatalogueProduct = async (req, res) => {
  try {
    const { cat_id, brand_id } = req.params;

    const { product_name, short_description, full_description } =
      req.body || {};

    const categoryId = Number(cat_id);
    const brandId = Number(brand_id);

    if (Number.isNaN(categoryId)) {
      throwError("Invalid category id", 400);
    }

    if (Number.isNaN(brandId)) {
      throwError("Invalid brand id", 400);
    }

    if (!product_name || !product_name.trim()) {
      throwError("product_name is required", 400);
    }

    const trimmedProductName = product_name.trim();
    const normalizeProductName = trimmedProductName.toLowerCase();

    const existsCategory = await dbConn("shahDigital.categories")
      .where({ cat_id: categoryId })
      .first();
    if (!existsCategory) {
      throwError("Category not found", 404);
    }

    const existsBrands = await dbConn("shahDigital.brands")
      .where({ brand_id: brandId })
      .whereNull("deleted_at")
      .first();
    if (!existsBrands) {
      throwError("Brand not found", 404);
    }

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

    const [productId] = await dbConn("shahDigital.products").insert({
      cat_id: categoryId,
      brand_id: brandId,
      product_name: normalizeProductName,
      product_display_name: trimmedProductName,
      short_description: short_description || null,
      full_description: full_description || null,
      product_current_price: 0,
      product_discounted_price: null,
      product_stock_quantity: 0,
      is_active: true,
    });

    const product = await dbConn("shahDigital.products")
      .select(
        "product_id",
        "cat_id",
        "brand_id",
        "product_name",
        "product_display_name",
        "short_description",
        "full_description",
        "is_active",
        "created_at",
      )
      .where({ product_id: productId })
      .first();

    return res.status(201).json({
      message: "Catalogue product created successfully",
      Product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = createCatalogueProduct;
