const { readFile, writeFile, readFileSync, writeFileSync } = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');
console.log('p', p);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    console.group('cart');
    console.log('Add to Cart button clicked');
    console.table([{ id: id, productPrice: productPrice }]);
    // let cart = { products: [], totalPrice: 0 };

    readFile(p, 'utf8', (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (err) {
        console.err(err);
      }
      data = JSON.parse(data);
      console.log(data);
      cart = data;
      console.log(cart);
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      console.table([{ existingProductIndex: existingProductIndex }]);
      const existingProduct = cart.products[existingProductIndex];
      console.table([{ existingProduct: existingProduct }]);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      console.log(cart);
      writeFile(p, JSON.stringify(cart), 'utf8', (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, prodPrice) {
    readFile(p, 'utf8', (err, data) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(data) };
      console.log('updatedCart_deleted', updatedCart);
      console.log(id);
      const product = updatedCart.products.find(function (p, index) {
        console.log(p.id);
        p.id == id;
        return true;
      });
      console.log('product', product);
      console.log('product', product.length);
      const productQty = product.qty;
      console.log('productQty', productQty);
      updatedCart.products = updatedCart.products.filter(
        function (product, index, arr) {
          console.log('product_inside_filter', product.id);
          return (product) => product.id === id;
        }
        // (product) => product.id !== id
      );
      console.log('updated cart', updatedCart.products);
      updatedCart.totalPrice = updatedCart.totalPrice - prodPrice * productQty;
      writeFile(p, JSON.stringify(updatedCart), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
  }

  static getCart(cb) {
    readFile(p, (err, data) => {
      const cart = JSON.parse(data);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
