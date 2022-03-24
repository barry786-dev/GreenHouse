const express = require('express');
const router = express.Router();

const {
  getRegisteredUser,
  logout,
  logOutPost,
  getDashboard,
  postDashboard,
} = require('../controllers/RegisteredUserRouterHandler');

router.get('/', getRegisteredUser);
router.get('/logout', logout);
router.post('/logout', logOutPost);
router.get('/dashboard', getDashboard);
router.post('/dashboard',postDashboard)

module.exports = router;
