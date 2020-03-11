const knex          = require('knex');
const config        = require('knexfile');
const knexConfig    = knex(config);
const TABLE_NAMES   = {SUBSCRIPTIONS: 'subscriptions'};

module.exports = {
    knex: knexConfig,
    TABLE_NAMES
};