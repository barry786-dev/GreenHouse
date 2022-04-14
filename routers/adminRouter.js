const express = require('express');
const router = express.Router();
const {
  adminDashboard,
  getAddProduct,
  postAddProduct,
} = require('../controllers/adminRouterHandlers');

router.get('/',adminDashboard)
router.get('/add-product', getAddProduct);
router.post('/add-product', postAddProduct);

module.exports = router