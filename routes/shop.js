const express = require('express');
const path = require('path');
// const logger = require('../util/loggerEasy');
const logger = require('../util/logger');

const rootDir = require('../util/path');
const adminRoutes = require('./admin');
const { products } = adminRoutes;

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', { products, docTitle: 'Shop' });
});

module.exports = router;
