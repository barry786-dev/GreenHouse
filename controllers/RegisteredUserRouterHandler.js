const { log } = require('console');
const { mongoose } = require('mongoose');
const path = require('path');
const { checkDocument } = require('../utils/db_utils');
const { addUserToProduct } = require('./db_products_Handlers.js');
const { addUserProductSettings } = require('./db_userProduct_Handlers.js');
const User_Product = require('../models/db_userProduct_Schema');
const { ghDbConnect } = require('../models/db_mongo');

///////////////////////////////////////////////////////////////////////////////
/** */
const getRegisteredUser = (req, res) => {
  //res.render('userDashboard');
  res.redirect('/user/dashboard');
};
const userDashboard = async (req, res) => {
  /* res.render('userDashboard', {
    type: 'LogOutBtn',
    alertModel: { show: false },
  }); */
  try {
      console.log('user');
      const userId = req.session.user.userId;
      const userName = req.session.user.username;
      await ghDbConnect();
      const result = await User_Product.find({ userId: userId });
      const devicesNames = result.map((item) => item.productNameByUser);
      res.render('userDashboard', {
        type: 'LogOutBtn',
        deviceName: devicesNames[0],
        userName,
      });
    } catch (error) {
      console.log('error', error);
    }
};
///////////////////////////////////////////////////////////////////////////////
const getDatedChart = async (req, res) => {
  // here you need to filter the data according to chosen date
  const chosenDate = req.params.date;
  const chosenDevice = req.params.device;
  const userId = req.session.user.userId;
  try {
    await ghDbConnect();
    const result = await User_Product.find({ userId: userId });
    const devicesNames = result.map((item) => item.productNameByUser);
    const resultToChart = result.filter(
      (item) => item.productNameByUser === chosenDevice
    );
    const ValuesObj = resultToChart.map((item) => item.data)[0];
    const lightArrayValues = ValuesObj.light;
    const SoilHumidityArrayValues = ValuesObj.SoilHumidity;
    const pumpArrayValues = ValuesObj.pump;
    const lightArrayDatedFilter = lightArrayValues.filter(
      (item) => item.date.toISOString().substr(0, 10) === chosenDate
    );
    const SoilHumidityArrayDatedFilter = SoilHumidityArrayValues.filter(
      (item) => item.date.toISOString().substr(0, 10) === chosenDate
    );
    const pumpArrayDatedFilter = pumpArrayValues.filter(
      (item) => item.date.toISOString().substr(0, 10) === chosenDate
    );
    const lightValuesToChart = lightArrayDatedFilter.map((item) => item.value);
    const lightDatesToChart = lightArrayDatedFilter.map((item) =>
      item.date.toISOString().substr(11, 5)
    );
    const SoilHumidityValuesToChart = SoilHumidityArrayDatedFilter.map(
      (item) => item.value
    );
    const SoilHumidityDatesToChart = SoilHumidityArrayDatedFilter.map((item) =>
      item.date.toISOString().substr(11, 5)
    );
    const pumpValuesToChart = pumpArrayDatedFilter.map((item) => item.value);
    const pumpDatesToChart = pumpArrayDatedFilter.map((item) =>
      item.date.toISOString().substr(11, 5)
    );
    // console.log(lightValuesToChart);
    // console.log(lightDatesToChart);
    // console.log(SoilHumidityValuesToChart);
    // console.log(SoilHumidityDatesToChart);
    // console.log(pumpValuesToChart);
    // console.log(pumpDatesToChart);
    res.render('datedChart', {
      lightLabels: lightDatesToChart,
      SoilLabels: SoilHumidityDatesToChart,
      pumpLabels: pumpDatesToChart,
      chosenDate: chosenDate,
      chosenDevice: chosenDevice,
      devicesNames: devicesNames,
      SoilHumidityData: SoilHumidityValuesToChart,
      lightData: lightValuesToChart,
      pumpData: pumpValuesToChart,
    });
  } catch (error) {
    console.log(error);
  }
};
///////////////////////////////////////////////////////////////////////////////
const getControllers = (req, res) => {
  const userName = req.session.user.username;
  res.render('userControllers', {
    alertModel: { show: false },
    userName,
  });
};
///////////////////////////////////////////////////////////////////////////////
const getLiveChart = (req, res) => {
  res.render('liveChart');
};
///////////////////////////////////////////////////////////////////////////////
/** */
const getAddDevice = (req, res) => {
  const userName = req.session.user.username;
  res.render('userAddDevice', {
    alertModel: { show: false },
    userName,
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
  userDashboard,
  logout,
  logOutPost,
  getAddDevice,
  postAddDevice,
  getControllers,
  getDatedChart,
  getLiveChart,
};
