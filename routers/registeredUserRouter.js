const express = require('express');
const router = express.Router();


const {
  getRegisteredUser,
  logout,
  logOutPost,
} = require('../controllers/RegisteredUserRouterHandler');

router.get('/', getRegisteredUser);
router.get('/logout', logout);
router.post('/logout', logOutPost);

module.exports = router;
