const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const addAttributeToCategory = async (req, res) => {
  try {
    const { catId, attributeIds } = req.body;

    if (!catId || !attributeIds || !Array.isArray(attributeIds)) {
      throwError("Category Id and Attribute Ids are required", 400);
    }

    if (attributeIds.length === 0) {
      throwError("At least one attribute is required", 400);
    }

    // 1. CHECK CATEGORY EXISTS

    const existsCat = await dbConn("shahDigital.categories")
      .where({
        cat_id: catId,
        deleted_at: null,
      })
      .first();

    if (!existsCat) {
      throwError("Category not found", 404);
    }

    // 2. CHECK ALL ATTRIBUTES EXISTS

    const existingAttributes = await dbConn("shahDigital.attributes")
      .whereIn("attribute_id", attributeIds)
      .where("attribute_is_active", 1);

    if (existingAttributes.length !== attributeIds.length) {
      throwError("Some attributes are invalid", 404);
    }

    // 3. CHECK DUPLICATE MAPPING

    const existingMappings = await dbConn("shahDigital.cat_attribute")
      .where("cat_id", catId)
      .whereIn("attribute_id", attributeIds);

    const alreadyMappedIds = existingMappings.map((item) => item.attribute_id);

    const newAttributeIds = attributeIds.filter(
      (id) => !alreadyMappedIds.includes(id),
    );

    if (newAttributeIds.length === 0) {
      throwError("All selected attributes are already mapped", 409);
    }

    // 4. INSERT MULTIPLE MAPPINGS

    const insertData = newAttributeIds.map((attributeId) => ({
      cat_id: catId,
      attribute_id: attributeId,
    }));

    await dbConn("shahDigital.cat_attribute").insert(insertData);

    return res.status(201).json({
      message: "Attributes attached to category successfully",
      inserted: insertData,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = addAttributeToCategory;
