const { log } = require('console');
const { mongoose } = require('mongoose');
const path = require('path');
const { checkDocument } = require('../utils/db_utils');
const { addUserToProduct } = require('./db_products_Handlers.js');
const { addUserProductSettings } = require('./db_userProduct_Handlers.js');
///////////////////////////////////////////////////////////////////////////////
const chart = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/chart.html'));
};

///////////////////////////////////////////////////////////////////////////////
/** */
const getRegisteredUser = (req, res) => {
  if (req.session.user) {
    res.render('userDashboard');
    //res.redirect('/user/dashboard');
  } else {
    res.redirect('/');
  }
};
///////////////////////////////////////////////////////////////////////////////
/** */
const getAddDevice = (req, res) => {
  if (req.session.user) {
    res.render('userAddDevice', {
      alertModel: { show: false },
    });
    //res.sendFile(path.join(__dirname, '../views/dashboard_addProduct.html'));
    //res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  } else {
    res.redirect('/');
  }
};

/** */
const postAddDevice = async (req, res) => {
  try {
    if (req.body.productNameByUser) {
      // const { minValue, period, runTime, serialNumber, productNameByUser } =
      //   req.body;
      const userId = req.session.user.userId;
      const result = await checkDocument('Products', {
        serialNumber: req.body.serialNumber,
      });
      if (!result) {
        return res.render('userAddDevice', {
          alertModel: {
            show: true,
            modelTitle: 'errorNu: 8',
            modelMsg:
              'this serial number is not in use please try again and be sure about it',
          },
        });
        /* return res.json({
          errorNu: 8,
          myMsg:
            'this serial number is not in use please try again and be sure about it',
        }); */
      } else if (result && result.userId.equals(userId)) {
        const result2 = await addUserProductSettings({ ...req.body, userId });
        if (result2.productNameByUser) {
          res.render('userAddDevice', {
            alertModel: {
              show: true,
              modelTitle: 'Success',
              modelMsg:
                'your product sittings is Done and the product is start working',
            },
          });
          /* res.json({
            SuccessNu: 0,
            myMsg:
              'your product sittings is Done and the product is start working',
          }); */
        }
      } else if (result && !result.userId.equals(userId)) {
        res.render('userAddDevice', {
          alertModel: {
            show: true,
            modelTitle: 'errorNu: 10',
            modelMsg:
              'you can not add this product because you are not the owner of this product',
          },
        });
        /* res.json({
          errorNu: 10,
          myMsg:
            'you can not add this product because you are not the owner of this product',
        }); */
      }
    } else {
      const { serialNumber } = req.body;
      const userId = req.session.user.userId;
      const result = await checkDocument('Products', {
        serialNumber: serialNumber,
      });
      console.log('this is the result', result);
      if (result && result.userId === null) {
        const result2 = await addUserToProduct(serialNumber, userId);
        if (result2.productName) {
          res.render('userAddDevice', {
            alertModel: {
              show: true,
              modelTitle: 'Success',
              modelMsg: 'your product is ready to be used',
            },
          });
          //res.json({ message: 'your product is ready to be used' });
          /* res.sendFile(
            path.join(__dirname, '../views/dashboard_addProduct.html')
          ); */
        }
      } else if (result && result.serialNumber) {
        res.render('userAddDevice', {
          alertModel: {
            show: true,
            modelTitle: 'errorNu: 9',
            modelMsg: 'this product is already sold and it is in use',
          },
        });
        /* res.json({
          errorNu: 9,
          myMsg: 'this product is already sold and it is in use',
        }); */
      } else {
        res.render('userAddDevice', {
          alertModel: {
            show: true,
            modelTitle: 'errorNu: 8',
            modelMsg: 'this serial number is not exist',
          },
        });
        /* res.json({
          errorNu: 8,
          myMsg: 'this serial number is not exist',
        }); */
      }
    }
  } catch (error) {
    log(
      'coming from RegisteredUserRouterHandler.js from inside postDashboard',
      error
    );
    res.json({ errorNu: 0, message: 'something going wrong' });
  }
};

///////////////////////////////////////////////////////////////////////////////
const logout = (req, res) => {
  req.session.destroy();
  //req.session = null;
  res.redirect('/');
};

const logOutPost = (req, res) => {
  req.session.destroy();
  res.json('done');
};
///////////////////////////////////////////////////////////////////////////////

module.exports = {
  getRegisteredUser,
  logout,
  logOutPost,
  getAddDevice,
  postAddDevice,
  chart,
};
