/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_addresses", function (table) {
    // Primary key
    table.increments("address_id").primary();

    // Foreign key -> customers.id
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");

    // User name
    table.string("f_name", 100).notNullable();
    table.string("l_name", 100).notNullable();

    // Complete address
    table.text("full_address").notNullable();

    // Location details
    table.string("city", 100).notNullable();
    table.string("state", 100).notNullable();
    table.string("postal_code", 20).notNullable();

    // Address settings
    table.boolean("is_default").notNullable().defaultTo(false);

    table.boolean("is_active").notNullable().defaultTo(true);

    // Timestamps
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    // Optional indexes for faster queries
    table.index("user_id");
    table.index(["user_id", "is_default"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_addresses");
};
