require('rootpath')();
global.__basedir = __dirname;

const server = require('src/server');
server.start();