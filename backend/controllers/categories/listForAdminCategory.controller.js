const dbConn = require("../../db/knex");

const listCatAdmin = async (req, res) => {
  try {
    const categories = await dbConn("shahDigital.categories").select(
      "cat_id",
      "cat_name",
      "cat_display_name",
      "cat_description",
      "cat_image",
      "cat_is_active",
      "created_at",
      "updated_at",
      "deleted_at",
    );
    return res.status(200).json({
      message: "Categories fetched successfully",
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

module.exports = listCatAdmin;
