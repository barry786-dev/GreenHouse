const express = require('express');
const router = express.Router();
const {
  getAdmin,
  adminDashboard,
  getAddProduct,
  postAddProduct,
} = require('../controllers/adminRouterHandlers');

router.get('/',getAdmin);
router.get('/dashboard',adminDashboard);
router.post('/dashboard', postAddProduct);
/* router.get('/add-product', getAddProduct);
router.post('/add-product', postAddProduct); */

module.exports = router