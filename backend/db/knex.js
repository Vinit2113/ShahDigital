const knex = require("knex");
const config = require("../knexfile");

/**
 * Initializes Knex using the settings for the current environment
 * (config.production when NODE_ENV=production, config.development
 * otherwise) so production traffic doesn't silently run on the dev
 * profile.
 */
const env = process.env.NODE_ENV === "production" ? "production" : "development";
const dbConn = knex(config[env]);

module.exports = dbConn;
