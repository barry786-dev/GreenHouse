const { log } = require('console');
const Products = require('../models/db_productSchema');
const { ghDbConnect } = require('../models/db_mongo');

async function addUserToProduct(serialNumber, userId){
  const product = await Products.findOne({ serialNumber: serialNumber });
    if (!product) {
      return 'NoP'// no such product
    }
  product.userId = userId;
  product.save((err) => {
    if (err) {
      log(err)
      return ('wrong');
    }
  });
  return 'added';
};



async function checkSN(serialNumber) {
  const existProduct = await Products.findOne({ serialNumber: serialNumber });
  log(existProduct)
  if (existProduct) {
    if (existProduct.userId === 'null') {
      return 'success';
    }
    return 'UPR'; //used product
  } else {
    return 'NoSN'; // No such serialNumber
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
