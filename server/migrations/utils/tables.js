const createTable = (knex, tableName, cb) => knex.schema.createTable(tableName, cb);

const dropTable = ({schema}, tableName) => schema.dropTableIfExists(tableName);

module.exports = {
    createTable,
    dropTable
};
