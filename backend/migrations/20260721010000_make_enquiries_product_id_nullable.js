/**
 * Allows enquiries.product_id to be NULL so general enquiries (submitted
 * from the site-wide "Enquire Now" button, not tied to a specific product)
 * can be saved alongside the existing product-specific enquiries.
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("enquiries", (table) => {
    table.integer("product_id").unsigned().nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("enquiries", (table) => {
    table.integer("product_id").unsigned().notNullable().alter();
  });
};
