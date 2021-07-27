const Product = require('../models/Product');
// console.log('Type of Product is ', typeof Product);
// console.log('Product ', Product);
// console.log('Product ', Product === Product.prototype.constructor);
// console.log('Product ', Product.prototype.save);
// console.log('Product ', Object.getOwnPropertyNames(Product.prototype));

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'สินค้าทั้งหมด',
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'ตะกร้าสินค้า',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'คำสั่งซื้อ',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'ชำระเงิน',
  });
};
