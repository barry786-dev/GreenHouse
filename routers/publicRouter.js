//const { log } = require('console');
const express = require('express');
// import emailSender

const {
  getHome,
  getAbout,
  getContact,
  postContact,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
} = require('../controllers/publicRouterHandlers');

const router = express.Router();

router.get('/', getHome);
router.get('/index', getHome);
router.get('/about', getAbout);
router.get('/contact', getContact);
router.post('/contact', postContact);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', postRegister);

module.exports = router;
