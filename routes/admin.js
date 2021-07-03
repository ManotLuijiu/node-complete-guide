const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const logger = require('../util/logger');

const router = express.Router();

const products = [];
logger.info(products);

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'เพิ่มสินค้า',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.post('/add-product', (req, res, next) => {
  const { title } = req.body;
  products.push({ title: title });
  res.redirect('/');
});

logger.debug(products);

exports.routes = router;
exports.products = products;
