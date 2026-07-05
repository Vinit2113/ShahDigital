/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("products");

  if (!exists) {
    return knex.schema.createTable("products", (table) => {
      table.increments("product_id").primary();
      table
        .integer("cat_id")
        .unsigned()
        .notNullable()
        .references("cat_id")
        .inTable("categories")
        .onDelete("CASCADE");
      table
        .integer("brand_id")
        .unsigned()
        .notNullable()
        .references("brand_id")
        .inTable("brands")
        .onDelete("CASCADE");
      table.string("product_name", 255).notNullable();
      table.string("product_display_name", 255).notNullable();
      table.string("short_description", 500);
      table.text("full_description");
      table.decimal("product_current_price", 10, 2).notNullable();
      table.decimal("product_discounted_price", 10, 2);
      table.integer("product_stock_quantity").unsigned().defaultTo(0);
      table.boolean("is_active").defaultTo(true);
      table.timestamps(true, true);
      table.timestamp("deleted_at").nullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("products");
};
