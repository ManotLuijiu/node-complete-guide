const express = require('express');
const {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  postCart,
  postCartDeleteProduct,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:prodId', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postCartDeleteProduct);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

module.exports = router;
