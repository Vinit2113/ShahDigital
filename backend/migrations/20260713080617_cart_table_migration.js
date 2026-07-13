/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("cart_id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.integer("quantity").unsigned().notNullable().defaultTo(1);

    table.timestamp("added_at").defaultTo(knex.fn.now());

    table.timestamp("deleted_at").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void>}
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cart");
};
