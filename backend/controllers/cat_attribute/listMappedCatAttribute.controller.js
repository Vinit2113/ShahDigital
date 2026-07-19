const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const listMappedCatAt = async (req, res) => {
  try {
    const catId = req.params.cat_id;

    if (!catId) {
      throwError("Category id is required ", 400);
    }

    const category = await dbConn("shahDigital.categories")
      .where({
        cat_id: catId,
        deleted_at: null,
      })
      .first();

    if (!category) {
      throwError("Category not foun", 404);
    }


    /**
     * SELECT
     * ca.cat_id,
     * c.cat_display_name,
     * a.attribute_id,
     * a.attribute_display_name
     * FROM shahDigital.cat_attribute as ca
     * INNER JOIN shahDigital.categories as c ON c.cat_id = ca.cat_id
     * INNER JOIN shahDigital.attributes as a ON a.attribute_id = ca.attribute_id
     * WHERE ca.cat_id AND a.attribute_is_active = 1
     */

    const attributes = await dbConn("shahDigital.cat_attribute as ca")
      .join("shahDigital.attributes as a", "ca.attribute_id", "a.attribute_id")
      .join("shahDigital.categories as c", "ca.cat_id", "c.cat_id")
      .select(
        "c.cat_id",
        "c.cat_name",
        "a.attribute_id",
        "a.attribute_display_name",
      )
      .where({
        "ca.cat_id": catId,
        "a.attribute_is_active": 1,
      });

    return res.status(200).json({
      message: "Category attribute fetched successfully",
      data: attributes,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = listMappedCatAt;
