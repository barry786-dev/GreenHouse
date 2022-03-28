const express = require('express');
const router = express.Router();
const { postData } = require('../controllers/dataRouterHandlers');

router.post('/', postData);

module.exports = router;
