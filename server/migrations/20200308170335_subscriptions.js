require('rootpath')();
const {TABLE_NAMES}             = require('connections/knex');
const {dropTable, createTable}  = require('migrations/utils/tables');

const createSubscriptionsTable = knex => createTable(knex, TABLE_NAMES.SUBSCRIPTIONS, table => {
    table.increments('id').notNull().primary();
    table.text('subscription');                     // subscription converted to string by JSON.stringify
    table.bigInteger('createdAt');                  // timestamp of creation a subscription
    table.bigInteger('lastExecution');              // timestamp of last push notification
    table.integer('messageIndex');                  // index of last showed notification
    table.integer('interval');                      // interval between notifications
    table.integer('errors');                        // interval between notifications
});

exports.up = knex => createSubscriptionsTable(knex);

exports.down = knex => dropTable(knex, TABLE_NAMES.SUBSCRIPTIONS);
