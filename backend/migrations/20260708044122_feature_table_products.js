/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_features", (table) => {
    table.increments("feature_id").primary();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("feature_name", 255).notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_features");
};
