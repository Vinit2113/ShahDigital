/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("enquiries", (table) => {
    table.increments("enquiries_id").primary();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE");

    table.string("name", 100).notNullable();
    table.string("email", 150).notNullable();
    table.string("phone", 20).notNullable();

    // Customer requirement
    table.text("message").notNullable();

    table.enum("status", ["NEW", "CONTACTED", "CLOSED"]).defaultTo("NEW");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("enquiries");
};
