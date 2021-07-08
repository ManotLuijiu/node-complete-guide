const express = require('express');
const { getAddProduct, postAddProduct } = require('../controllers/products');

const router = express.Router();

router.get('/add-product', getAddProduct);
// router.get('/add-product', (req, res, next) => {
//   res.render('add-product', {
//     pageTitle: 'เพิ่มสินค้า',
//     path: '/admin/add-product',
//     formsCSS: true,
//     productCSS: true,
//     activeAddProduct: true,
//   });
// });

router.post('/add-product', postAddProduct);
// router.post('/add-product', (req, res, next) => {
//   const { title } = req.body;
//   products.push({ title: title });
//   res.redirect('/');
// });

module.exports = router;
