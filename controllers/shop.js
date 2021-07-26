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
      pageTitle: 'ร้านค้า',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
