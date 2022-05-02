const express = require('express');
const router = express.Router();

const {
  getRegisteredUser,
  userDashboard,
  logout,
  logOutPost,
  getAddDevice,
  postAddDevice,
  getDatedChart,
  getLiveChart,
  getControllers,
} = require('../controllers/RegisteredUserRouterHandler');

router.get('/', getRegisteredUser);
router.get('/dashboard', userDashboard);
router.get('/logout', logout);
router.post('/logout', logOutPost);
router.get('/add-device', getAddDevice);
router.post('/add-device', postAddDevice);
router.get('/dated-chart/:date/:device', getDatedChart);
router.get('/live-chart', getLiveChart);
router.get('/controllers', getControllers);

module.exports = router;
