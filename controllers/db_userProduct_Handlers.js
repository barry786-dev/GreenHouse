const { log } = require('console');
const { mongoose } = require('mongoose');
const User_Product = require('../models/db_userProduct_Schema');
const { ghDbConnect } = require('../models/db_mongo');

const addUserProductSettings = (
  serialNumber,
  userId,
  minValue,
  period,
  runTime,
  productNameByUser
) => {
  return new Promise((resolve, reject) => {
    ghDbConnect()
      .then(() => {
        const newUserProduct = new User_Product({
          productNameByUser,
          serialNumber,
          userId: new mongoose.Types.ObjectId(userId),
          settings: {
            SoilHumidityS: {
              minValue,
              period,
              runTime,
            },
          },
        });
        newUserProduct
          .save()
          .then((savedUserProduct) => resolve(savedUserProduct))
          .catch((error) =>
            reject({
              myMsgToUser: error.message,
              myMsg:
                'error during try to save the product come from db_userProducts_Handlers.js from inside addUserProductSettings',
              err: error,
            })
          );
      })
      .catch((error) =>
        reject({
          myMsgToUser:
            'error during trying to connect to main database, please try again later or contact the admin',
          myMsg:
            'error during try to connect to the data come from db_userProduct_Handlers.js from inside addUserProductSettings',
          err: error,
        })
      );
  });
};

module.exports = { addUserProductSettings };
