const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('In another middleware - Add Product add');
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  const { title } = req.body;
  console.log(title);
  res.redirect('/');
});

module.exports = router;
