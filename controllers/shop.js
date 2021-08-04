const Product = require('../models/Product');
const Cart = require('../models/Cart');

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

exports.getProduct = (req, res, next) => {
  //   console.log('getProduct', req);
  const prodId = req.params.prodId;
  Product.findById(prodId, (product) => {
    // console.log(product);
    res.render('shop/product', {
      product,
      pageTitle: `Product: ${product.title}`,
      path: '/products',
    });
  });
  //   res.redirect('/');
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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductsData = cart.products.find(function (p, index) {
          p.id == product.id;
          return true;
        });
        if (cartProductsData) {
          cartProducts.push({
            productData: product,
            qty: cartProductsData.qty,
          });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'ตะกร้าสินค้า',
        products: cartProducts,
      });
    });
  });
};

// const product = updatedCart.products.find(function (p, index) {
//     console.log(p.id);
//     p.id == id;
//     return true;
//   });

exports.postCart = (req, res, next) => {
  //   console.log('postCart_req', req);
  //   console.log('postCart_res', res);

  const { prodId } = req.body;
  console.log('postCart', prodId);
  console.log('postCart', typeof prodId);

  //   Product.fetchAll((products) => {
  //     console.log(products.length);
  //     console.log(typeof products);
  //     console.log('fetchAll', products);
  //   });

  Product.findByIdCart(prodId, (product) => {
    const { price } = product;
    console.log('findByIdCart_in_shop.js', price);
    Cart.addProduct(prodId, price);
  });

  //   Product.findById(prodId, (product) => {
  //     console.log('prodId', prodId);
  //     console.log('product', product.length);
  //     console.log('product', product.price);
  //     Cart.addProduct(prodId, '19.99');
  //   });
  res.redirect('/cart');
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
