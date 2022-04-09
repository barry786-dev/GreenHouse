//const { log } = require('console');
const express = require('express');
const { Validation_register_user } = require('../models/validationSchemas');

const {
  getHome,
  getAbout,
  getArticles,
  getArticle1,
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
router.get('/about', getAbout);
router.get('/articles', getArticles);
router.get('/article/article-1', getArticle1);
router.get('/contact-us', getContact);
router.post('/contact-us', postContact);
/* router.get('/auth', getLogin);
router.post('/auth',postLogin) */
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', Validation_register_user, postRegister);
router.get('/api/auth/confirm/:confirmationCode', verifyUser);

module.exports = router;
