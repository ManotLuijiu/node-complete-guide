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
      writeFileSync(p, JSON.stringify(cart), 'utf8', (err) => {
        console.log(err);
      });
    });
  }
};
