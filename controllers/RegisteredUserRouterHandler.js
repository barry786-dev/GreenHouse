const { log } = require('console');
const { mongoose } = require('mongoose');
const path = require('path');
const { checkDocument } = require('../utils/db_utils');
const { addUserToProduct } = require('./db_products_Handlers.js');
const { addUserProductSettings } = require('./db_userProduct_Handlers.js');
///////////////////////////////////////////////////////////////////////////////
const getDatedChart = (req, res) => {
  // here you need to filter the data according to chosen date
  res.render('datedChart', {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    chosenDate: req.params.date,
    SoilHumidityData: [0, 10, 5, 2, 20, 30, 45,45,45,45,40,45,45,40],
    lightData: [0, 10, 5, 0, 10, 5, 0],
    pumpData : [0, 0, 0, 0, 1, 0, 0,0,1,0],
  });
};
///////////////////////////////////////////////////////////////////////////////
/** */
const getRegisteredUser = (req, res) => {
    res.render('userDashboard');
};
///////////////////////////////////////////////////////////////////////////////
const getControllers = (req, res) => {
    res.render('userControllers', {
      alertModel: { show: false },
    });
};
///////////////////////////////////////////////////////////////////////////////
const getLiveChart = (req, res) => {
    res.render('liveChart');
}
///////////////////////////////////////////////////////////////////////////////
/** */
const getAddDevice = (req, res) => {
    res.render('userAddDevice', {
      alertModel: { show: false },
    });
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
  getControllers,
  getDatedChart,
  getLiveChart,
};
