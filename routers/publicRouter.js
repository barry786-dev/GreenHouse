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
/* router.get('/articles', getArticles);
router.get('/article/article-1', getArticle1); */
router.get('/contact-us', getContact);
router.post('/contact-us/:captchaResponse', validation_contact_us, postContact);
router.get('/auth', getAuth);
router.post('/login', postLogin);
router.get('/register', getHome);
router.post('/register', Validation_register_user, postRegister);
router.get('/api/auth/confirm/:confirmationCode', verifyUser);
router.get('/dashboard', getDashboard);

module.exports = router;
