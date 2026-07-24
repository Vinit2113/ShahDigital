const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");
const fs = require("fs");
const path = require("path");

const updateCatById = async (req, res) => {
  try {
    const catId = req.params.cat_id;

    if (!catId) {
      throwError("Category ID is required", 400);
    }

    const { cat_name, cat_description } = req.body || {};

    if (!cat_name && !cat_description && !req.file) {
      throwError("Enter at least one field", 400);
    }

    // 1. CHECK IF CATEGORY EXISTS
    const existingCategory = await dbConn("shahDigital.categories")
      .where({
        cat_id: catId,
        deleted_at: null,
      })
      .first();

    if (!existingCategory) {
      throwError("Category not found", 404);
    }

    const updateData = {
      updated_at: dbConn.fn.now(),
    };

    // 2. UPDATE NAME (normalize + duplicate check)
    if (cat_name) {
      const trimmedCatName = cat_name.trim();
      const normalizedCatName = trimmedCatName.toLowerCase();

      const duplicate = await dbConn("shahDigital.categories")
        .where({ deleted_at: null })
        .andWhereRaw("LOWER(cat_name) = ?", [normalizedCatName])
        .andWhereNot({ cat_id: catId })
        .first();

      if (duplicate) {
        throwError("Category already exists", 409);
      }

      updateData.cat_name = normalizedCatName;
      updateData.cat_display_name = trimmedCatName;
    }

    // 3. UPDATE DESCRIPTION
    if (cat_description) {
      updateData.cat_description = cat_description.trim();
    }

    if (req.file) {
      if (existingCategory.cat_image) {
        const oldImagePath = path.join(
          __dirname,
          "../../uploads/categories",
          existingCategory.cat_image,
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      updateData.cat_image = req.file.filename;
    }

    // 4. UPDATE CATEGORY
    await dbConn("shahDigital.categories")
      .where({
        cat_id: catId,
        deleted_at: null,
      })
      .update(updateData);

    return res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Category already exists" });
    }

    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = updateCatById;
