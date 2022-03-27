//const { log } = require('console');
const express = require('express');
const { Validation_register_user } = require('../models/validationSchemas');

const {
  getHome,
  getAbout,
  getContact,
  postContact,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  verifyUser,
} = require('../controllers/publicRouterHandlers');

const router = express.Router();

router.get('/', getHome);
router.get('/index', getHome);
//router.get('/about', getAbout);
//router.get('/contact', getContact);
//router.post('/contact', postContact);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', Validation_register_user, postRegister);
router.get('/api/auth/confirm/:confirmationCode', verifyUser);

module.exports = router;
