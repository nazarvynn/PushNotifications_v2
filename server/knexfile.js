const path          = require('path');
const config        = require('config');
// const DB_CONNECTION = config.get('dbConnection');

module.exports = {
    client:         'pg',
    version:        '8.5.1',
    // connection: DB_CONNECTION,
    connection: {
        database:   'pn-db',
        user:       'postgres',
        password:   'postgres'
    },
    pool: {
        min:        0,
        max:        7
    },
    migrations: {
        directory:  path.join(__dirname, 'migrations'),
        tableName: 'knex_migrations'
    }
};
