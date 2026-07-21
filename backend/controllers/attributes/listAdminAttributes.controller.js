const dbConn = require("../../db/knex");

const listAdminAttributes = async (req, res) => {
  try {
    const attributes = await dbConn("shahDigital.attributes").select(
      "attribute_id",
      "attribute_name",
      "attribute_display_name",
      "attribute_description",
      "attribute_is_active",
      "created_at",
      "updated_at",
    );
    return res.status(200).json({
      message: "Attribute fetched successfully",
      count: attributes.length,
      attributes,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR" });
  }
};

module.exports = listAdminAttributes;
