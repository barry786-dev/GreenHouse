const { log } = require('console');
const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ikvk3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

function ghDbConnect() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      log('MongoDb Connected...');
      resolve();
    } else {
      mongoose
        .connect(connectionString, {
          userNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          log('MongoDb Connected...');
          resolve();
        })
        .catch((error) =>
          reject({
            myMsg:
              'failed to connect to the data base, this error come from db_mongo.js from inside ghDbConnect function',
            err: error,
          })
        );
    }
  });
}

module.exports = { ghDbConnect };
