const express = require('express');
const { getProducts } = require('../controllers/shop');

const router = express.Router();

router.get('/', getProducts);
router.get('/products');
router.get('/cart');
router.get('/checkout');

module.exports = router;
