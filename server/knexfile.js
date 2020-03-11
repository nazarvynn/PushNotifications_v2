const path          = require('path');
const config        = require('config');
const DB_CONNECTION = config.get('dbConnection');

module.exports = {
    client:         'pg',
    version:        '7.8',
    connection:     DB_CONNECTION,
    pool: {
        min:        0,
        max:        7
    },
    migrations: {
        directory: path.join(__dirname, 'migrations'),
        tableName: 'migrations'
    }
};