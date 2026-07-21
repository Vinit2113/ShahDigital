const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");


const addAttributeToCategory = async (req, res) => {
  try {
    const { catId, attributeIds } = req.body;

    if (!catId || !Array.isArray(attributeIds)) {
      throwError("Category Id and Attribute Ids are required", 400);
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

    // 2. CHECK ALL SUBMITTED ATTRIBUTES EXIST (only when there are any)

    if (attributeIds.length > 0) {
      const existingAttributes = await dbConn("shahDigital.attributes")
        .whereIn("attribute_id", attributeIds)
        .where("attribute_is_active", 1);

      if (existingAttributes.length !== attributeIds.length) {
        throwError("Some attributes are invalid", 404);
      }
    }

    // 3. DIFF AGAINST CURRENTLY MAPPED ATTRIBUTES

    const existingMappings = await dbConn("shahDigital.cat_attribute").where(
      "cat_id",
      catId,
    );

    const currentlyMappedIds = existingMappings.map((item) => item.attribute_id);

    const toInsertIds = attributeIds.filter(
      (id) => !currentlyMappedIds.includes(id),
    );
    const toRemoveIds = currentlyMappedIds.filter(
      (id) => !attributeIds.includes(id),
    );

    // 4. APPLY INSERT + DELETE TOGETHER SO THE MAPPING NEVER ENDS UP HALF-SAVED

    await dbConn.transaction(async (trx) => {
      if (toRemoveIds.length > 0) {
        await trx("shahDigital.cat_attribute")
          .where("cat_id", catId)
          .whereIn("attribute_id", toRemoveIds)
          .del();
      }

      if (toInsertIds.length > 0) {
        const insertData = toInsertIds.map((attributeId) => ({
          cat_id: catId,
          attribute_id: attributeId,
        }));

        await trx("shahDigital.cat_attribute").insert(insertData);
      }
    });

    return res.status(200).json({
      message: "Category attribute mapping saved successfully",
      inserted: toInsertIds,
      removed: toRemoveIds,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = addAttributeToCategory;
