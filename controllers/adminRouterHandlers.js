const { log } = require('console');
const path = require('path');
const { addNewProduct } = require('./db_products_Handlers');

const getAdmin = (req, res) => {
  res.redirect('/admin/dashboard');
}

const adminDashboard = (req, res) => {
    res.render('adminDashboard', {
      type: 'LogOutBtn',
      alertModel: { show: false },
    });
    //res.redirect('/dashboard');
};

const getAddProduct = (req, res) => {
  /* res.render('adminAddProduct', {
    alertModel: { show: false },
  }); */
};

const postAddProduct = (req, res) => {
    const { productName, serialNumber, productDescription } = req.body;
    const newProduct = {
      productName,
      serialNumber,
      productDescription,
    };
    addNewProduct(newProduct)
      .then((result) => {
        res.render('adminDashboard', {
          type: 'LogOutBtn',
          alertModel: {
            show: true,
            modelTitle: 'Susses',
            modelMsg: `product added successfully`,
            modelType: 'addProduct',
          },
        });
        //res.json({ message: 'product added successfully' });
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
          res.render('adminDashboard', {
            type: 'LogOutBtn',
            alertModel: {
              show: true,
              modelTitle: 'Failed',
              modelMsg: `An product with that ${JSON.stringify(
                error.err.keyValue
              )} already exists`,
              modelType: 'danger',
            },
          });
          /* res.json({
            message: `An product with that ${JSON.stringify(
              error.err.keyValue
            )} already exists`,
          }); */
        } else {
          // handling database connection fail errors and other validation errors
          log([error.myMsg, error.err.message]);
          /* res.render('adminAddProduct', {
            signed: false,
            alertModel: {
              show: true,
              modelTitle: 'Failed',
              modelMsg: error.myMsgToUser,
            },
          }); */
          res.json({
            message: error.myMsgToUser,
          });
        }
      });
};

module.exports = { getAdmin,adminDashboard, postAddProduct, getAddProduct };
