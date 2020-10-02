require('dotenv').config();

const CONFIG = {
  PORT: process.env.PORT || '3000',
  HOST: process.env.HOST || '127.0.0.1',
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017',
  DB_NAME: process.env.DB_NAME || 'default',
};

module.exports = CONFIG;
