const express = require('express');
const path = require('path');
// const logger = require('../util/loggerEasy');
const logger = require('../util/loggerWithLineNew');

const rootDir = require('../util/path');
const adminRoutes = require('./admin');
const { products } = adminRoutes;

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop');
});

module.exports = router;
