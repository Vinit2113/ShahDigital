/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_media", (table) => {
    table.increments("media_id").primary();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE");

    table
      .enum("media_type", ["image", "video"])
      .notNullable()
      .defaultTo("image");

    table.string("media_url").notNullable();
    table.text("alt_text").nullable();

    table.integer("display_order").defaultTo(1);
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_media");
};
