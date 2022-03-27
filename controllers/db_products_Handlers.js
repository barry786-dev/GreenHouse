const { log } = require('console');
const { mongoose } = require('mongoose');
const Products = require('../models/db_productSchema');
const { ghDbConnect } = require('../models/db_mongo');

async function addUserToProduct(serialNumber, userId) {
  try{
    await ghDbConnect();
    const product = await Products.findOneAndUpdate(
      { serialNumber: serialNumber },
      { userId: new mongoose.Types.ObjectId(userId) },
      { new: true }
    );
    return product;
  } catch (error) {
    return error;
  }
}

async function checkSN(serialNumber) {
  try {
    await ghDbConnect();
    const product = await Products.findOne({ serialNumber: serialNumber });
    if (!product) {
      return {
        errorNu: 8,
        myMsg: 'this serial number is not exist',
      }; // no such product
    }
    if (product.userId) {
      return {
        errorNu: 9,
        myMsg: 'this product is already sold and it is in use',
      }; // this product is already sold and it is in use
    }
    return 'success';
  } catch (error) {
    return error;
  }
}

/**
 *
 * @param {{ProductData Add new products item}}
 */
const addNewProduct = (ProductData) => {
  return new Promise((resolve, reject) => {
    ghDbConnect()
      .then(() => {
        const newProduct = new Products(ProductData);
        newProduct
          .save()
          .then((savedProduct) => resolve(savedProduct))
          .catch((error) =>
            reject({
              myMsgToUser: error.message,
              myMsg:
                'error during try to save the product come from db_products_Handlers.js from inside addProduct',
              err: error,
            })
          );
      })
      .catch((error) =>
        reject({
          myMsgToUser:
            'error during trying to connect to main database, please try again later or contact the admin',
          myMsg:
            'error during try to connect to the data come from db_products_Handlers.js from inside addProduct',
          err: error,
        })
      );
  });
};
module.exports = { addNewProduct, checkSN, addUserToProduct };
