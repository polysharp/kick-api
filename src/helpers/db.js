const mongoose = require('mongoose');
const { DB_CONNECTION_STRING, DB_NAME } = require('../config');

const db = {
  connect: async () => {
    try {
      return await mongoose.connect(
        DB_CONNECTION_STRING,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          dbName: DB_NAME
        },
        error => {
          if (error) {
            console.error(error);
            return error;
          }
          console.log(`Connected to ${DB_NAME} db.`);
          return null;
        }
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }
};

module.exports = db;
