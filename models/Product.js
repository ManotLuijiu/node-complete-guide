const { readFile, writeFile } = require('fs');
const path = require('path');
const Cart = require('./Cart');
// let products = [];

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  readFile(p, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        writeFile(p, JSON.stringify(products), 'utf8', (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const { price } = product;
      const updatedProducts = products.filter((product) => product.id !== id);
      writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByIdCart(id, cb) {
    readFile(p, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        cb([]);
      } else {
        console.log('data', data);
        console.log('id', id);
        const single = JSON.parse(data);
        console.log('single', single);
        const product = single.find(function (p, index) {
          console.log(p.id);
          console.log(typeof p.id);
          p.id == id;
          return true;
        });
        console.log('product', product);
        cb(product);
      }
    });
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      console.log('findById_length', products.length);
      //   console.log('findById_type', typeof products);
      //   console.log('findById_Products', products);
      console.log('findById_Products_up', id);
      //   console.log('findById_Products', typeof id);
      //   const product = products.find((p) => {
      //     console.log(p.id === id);
      //     // p.id === id;
      //   });
      const p_test = products.find((p) => {
        console.log('p_test_id', p.id);
        console.log('p_test_id', typeof p.id);
        if (p.id === id) {
          console.log('True');
        } else {
          console.log('False');
        }
      });
      const product = products.find((p) => p.id === id);
      console.log('findById_id', product.id);
      console.log('findById_product', product);
      cb(product);
    });
  }
};
