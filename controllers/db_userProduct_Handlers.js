const { log } = require('console');
const { mongoose } = require('mongoose');
const User_Product = require('../models/db_userProduct_Schema');
const { ghDbConnect } = require('../models/db_mongo');

const addUserProductData = async (data) => {
  serialNumber = data[0];
  /*  [
    { light: 0, date: 1648908599346 },
    { SoilHumidity: 53, date: 1648908599346 },
    { pump: 0, date: 1648908599347 },
  ]; */
  try {
    await ghDbConnect();
    const result = await User_Product.findOneAndUpdate(
      { serialNumber: serialNumber },
      {
        $push: {
          'data.light': { value: data[1].light, date: data[1].date },
          'data.SoilHumidity': {
            value: data[2].SoilHumidity,
            date: data[2].date,
          },
          'data.pump': { value: data[3].pump, date: data[3].date },
        },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    log(error);
  }
};

const addUserProductSettings = ({
  serialNumber,
  userId,
  minValue,
  period,
  runTime,
  productNameByUser,
}) => {
  return new Promise((resolve, reject) => {
    ghDbConnect()
      .then(() => {
        const newUserProduct = new User_Product({
          productNameByUser,
          serialNumber,
          userId: new mongoose.Types.ObjectId(userId),
          settings: {
            SoilHumidityS: {
              //add the default settings values (0,24,1 according to userProduct_Schema) in case the user does not send values
              minValue: minValue ? minValue : 0,
              period: period ? period : 24,
              runTime: runTime ? runTime : 1,
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

module.exports = { addUserProductSettings, addUserProductData };
