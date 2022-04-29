//const { log } = require('console');
const express = require('express');
const {
  Validation_register_user,
  validation_contact_us,
} = require('../models/validationSchemas');

const {
  getHome,
  getAbout,
  getContact,
  postContact,
  getAuth,
  postRegister,
  postLogin,
  verifyUser,
  getDashboard,
} = require('../controllers/publicRouterHandlers');

const router = express.Router();

router.get('/', getHome);
router.get('/index', getHome);
router.get('/about', getAbout);
router.get('/contact-us', getContact);
router.post('/contact-us/:captchaResponse', validation_contact_us, postContact);
router.get('/auth', getAuth);
router.get('/login', getAuth);
router.post('/login', postLogin);
router.get('/register', getAuth); //take care of this add param
router.post('/register', Validation_register_user, postRegister);
router.get('/api/auth/confirm/:confirmationCode', verifyUser);// deal later with the router if someone try to access this route
router.get('/dashboard', getDashboard);

module.exports = router;
