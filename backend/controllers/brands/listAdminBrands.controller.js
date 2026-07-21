
const dbConn = require("../../db/knex");

const listAdminBrands = async (req, res) => {
  try {
    const brands = await dbConn("shahDigital.brands").select(
      "brand_id",
      "brand_name",
      "brand_display_name",
      "brand_description",
      "brand_image",
      "brand_is_active",
      "created_at",
      "updated_at",
      "deleted_at",
    );

    return res.status(200).json({
      message: "Brands fetched successfully",
      count: brands.length,
      brands,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR" });
  }
};

module.exports = listAdminBrands;
