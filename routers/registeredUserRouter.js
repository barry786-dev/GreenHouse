const express = require('express');
const router = express.Router();

const {
  getRegisteredUser,
  logout,
  logOutPost,
  getDashboard,
  postDashboard,
  chart
} = require('../controllers/RegisteredUserRouterHandler');

router.get('/', getRegisteredUser);
router.get('/logout', logout);
router.post('/logout', logOutPost);
router.get('/dashboard', getDashboard);
router.post('/dashboard',postDashboard);
router.get('/chart', chart)

module.exports = router;
