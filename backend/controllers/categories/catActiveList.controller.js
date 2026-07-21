const dbConn = require("../../db/knex");

const listActiveCategories = async (req, res) => {
  try {
    const categories = await dbConn("shahDigital.categories")
      .select(
        "cat_id",
        "cat_display_name",
        "cat_name",
        "cat_description",
        "cat_image",
        "cat_is_active",
      )
      .where({ deleted_at: null })
      .orderBy("cat_id", "desc");

    return res.status(200).json({
      message: "Categories fetched successfully",
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR" });
  }
};

module.exports = listActiveCategories;
