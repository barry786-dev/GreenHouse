const express = require('express');
const router = express.Router();

const {
  getRegisteredUser,
  logout,
  logOutPost,
  getAddDevice,
  postAddDevice,
  chart,
} = require('../controllers/RegisteredUserRouterHandler');

router.get('/', getRegisteredUser);
router.get('/logout', logout);
router.post('/logout', logOutPost);
router.get('/add-device', getAddDevice);
router.post('/add-device', postAddDevice);
router.get('/chart', chart)

module.exports = router;
