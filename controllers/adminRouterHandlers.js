const { log } = require('console');
const path = require('path');
const { addNewProduct } = require('./db_products_Handlers');

const adminDashboard = (req, res) => {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    res.json({ massage: 'you are not allowed to enter to this resources' });
  } else {
    res.sendFile(path.join(__dirname, '../views/AdminDashboard.html'));
  }
};

/* const getAddProduct = (req, res) => {
  res.redirect('/admin');
}; */

const postAddProduct = (req, res) => {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    res.json({ massage: 'you are not allowed to enter to this resources' });
  } else {
    const { productName, serialNumber, productDescription } = req.body;
    const newProduct = {
      productName,
      serialNumber,
      productDescription,
    };
    addNewProduct(newProduct)
      .then((result) => {
        res.json({ message: 'product added successfully' });
      })
      .catch((error) => {
        //log('here is the error', error)
        // handling database unique validations errors
        if ((error.err.name = 'MongoServerError' && error.err.code === 11000)) {
          log([
            error.err.name,
            error.err.code,
            error.err.keyValue,
            error.err.message,
            error.myMsg,
          ]);
          res.json({
            message: `An product with that ${JSON.stringify(
              error.err.keyValue
            )} already exists`,
          });
        } else {
          // handling database connection fail errors and other validation errors
          log([error.myMsg, error.err.message]);
          res.json({
            message: error.myMsgToUser,
          });
        }
      });
  }
};

module.exports = { adminDashboard, postAddProduct };
