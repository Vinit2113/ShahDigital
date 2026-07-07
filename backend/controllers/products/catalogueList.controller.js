const dbConn = require("../../db/knex");

const catalogueList = async (req, res) => {
  try {
    /**
         * SELECT
    c.cat_id,
    c.cat_display_name,
    b.brand_id,
    b.brand_display_name,
    b.brand_image,
    p.product_id,
    p.product_display_name,
    p.short_description
FROM shahDigital.products AS p
INNER JOIN shahDigital.categories AS c
    ON p.cat_id = c.cat_id
INNER JOIN shahDigital.brands AS b
    ON p.brand_id = b.brand_id
WHERE
    p.product_id = 1
    AND p.deleted_at IS NULL
    AND c.deleted_at IS NULL
    AND b.deleted_at IS NULL
    AND b.brand_is_active = 1
ORDER BY p.product_id DESC; */
    const catalogueData = await dbConn("shahDigital.products AS p")
      .select(
        "c.cat_id",
        "c.cat_display_name",
        "b.brand_id",
        "b.brand_display_name",
        "b.brand_image",
        "p.product_id",
        "p.product_display_name",
        "p.short_description",
      )
      .join("shahDigital.categories AS c ", "p.cat_id", "c.cat_id")
      .join("shahDigital.brands AS b", "p.brand_id", "b.brand_id")
      .where("p.product_id", 1)
      .whereNull("p.deleted_at")
      .whereNull("c.deleted_at")
      .whereNull("b.deleted_at")
      .where("b.brand_id_is_active", 1)
      .orderBy("p.product_id", "desc");

    return res.status(200).json({
      message: "Catalogue list fetched successfully",
      data: catalogueData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "INTERNAL SERVER ERROR" });
  }
};

module.exports = catalogueList;
