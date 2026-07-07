/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_attributes", (table) => {
    table.increments("product_attribute_id").primary();

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE");

    table
      .integer("attribute_id")
      .unsigned()
      .notNullable()
      .references("attribute_id")
      .inTable("attributes")
      .onDelete("CASCADE");

    table.string("attribute_value", 255).notNullable();
    table.string("display_product_attribute");

    // Prevent duplicate attribute per product

    // Optional but recommended
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_attributes");
};
