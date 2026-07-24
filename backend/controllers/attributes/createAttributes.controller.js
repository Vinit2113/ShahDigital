const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const createAttribute = async (req, res) => {
  try {
    const { attribute_name, attribute_description } = req.body;

    if (!attribute_name) {
      throwError("Attribute name is requried", 400);
    }

    const trimmedAttributeName = attribute_name.trim();
    const normalizedAttributeName = trimmedAttributeName.toLowerCase();

    const existingAttribute = await dbConn("shahDigital.attributes")
      .where({
        attribute_is_active: 1,
      })
      .andWhereRaw("LOWER(attribute_name) = ?", normalizedAttributeName)
      .first();

    if (existingAttribute) {
      throwError("Attribute already exists", 409);
    }

    const [newAttributeId] = await dbConn("shahDigital.attributes").insert({
      attribute_name: normalizedAttributeName,
      attribute_display_name: trimmedAttributeName,
      attribute_description: attribute_description?.trim() || null,
      attribute_is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const newAttribute = await dbConn("shahDigital.attributes")
      .where({ attribute_id: newAttributeId })
      .first();

    return res.status(201).json({
      message: "Attribute created successfully",
      attribute: newAttribute,
    });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Attribute already exists" });
    }

    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR" });
  }
};

module.exports = createAttribute;
