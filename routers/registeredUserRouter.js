const express = require('express');
const router = express.Router();

const {
  getRegisteredUser,
  logout,
  logOutPost,
  getAddDevice,
  postAddDevice,
  getDatedChart,
  chart,
  getControllers,
} = require('../controllers/RegisteredUserRouterHandler');

router.get('/', getRegisteredUser);
router.get('/logout', logout);
router.post('/logout', logOutPost);
router.get('/add-device', getAddDevice);
router.post('/add-device', postAddDevice);
router.get('/dated-chart', getDatedChart);
router.get('/controllers', getControllers);
router.get('/chart', chart)

module.exports = router;
