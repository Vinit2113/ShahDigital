/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("shahDigital.customers", function (table) {
    table.string("phone_number", 20).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("shahDigital.customers", function (table) {
    table.dropColumn("phone_number");
  });
};
