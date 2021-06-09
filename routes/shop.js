const express = require('express');
const path = require('path');
// const logger = require('../util/loggerEasy');
const logger = require('../util/logger');

const rootDir = require('../util/path');
const adminRoutes = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const { products } = adminRoutes;
  res.render('shop', { prods: products, pageTitle: 'ร้านค้า', path: '/' });
});

module.exports = router;
