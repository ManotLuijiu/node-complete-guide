const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const logger = require('../util/loggerWithLineNew');

const router = express.Router();

const products = [];
logger.info(products);

router.get('/add-product', (req, res, next) => {
  logger.info(req.url);
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  const { title } = req.body;
  logger.debug(req.body);
  logger.debug(title);
  products.push({ title: title });
  res.redirect('/');
});

logger.debug(products);

exports.routes = router;
exports.products = products;
