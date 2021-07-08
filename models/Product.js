const { readFile, writeFile } = require('fs');
const path = require('path');
// let products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );
    readFile(p, 'utf-8', (err, data) => {
      let products = [];
      console.log('data:18', data);
      if (!err) {
        products = JSON.parse(data);
        console.log('products:20', products);
      }
      products.push(this);
      console.log('products:24 saved', products);
      console.log('products type: ', typeof products);
      writeFile(p, JSON.stringify(products), 'utf8', (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );
    readFile(p, 'utf-8', (err, data) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(data));
    });
    // return products;
  }
};

// module.exports = class Product {
//   constructor(title) {
//     console.log('title', title);
//     this.title = title;
//   }

//   save() {
//     const p = path.join(
//       path.dirname(require.main.filename),
//       'data',
//       'products.json'
//     );
//     // console.log('this', this);
//     // console.log('save');
//     // const data = JSON.stringify(this);
//     // console.log('data', JSON.stringify(data));
//     // console.log(typeof data);
//     // const parsedData = JSON.parse(data);
//     // console.log('parsedData', parsedData);
//     // let products = [];
//     // products.push(data);
//     // console.log('Product_Model:23', products);
//     // console.log(typeof products);
//     readFile(p, 'utf-8', (err, data) => {
//       console.log(this);
//       console.log('fileContent', data);
//       let products = [];
//       products = JSON.parse(data);
//       products.push(this);
//       console.log(products);
//       console.log(typeof products);
//     });
//     writeFile(p, JSON.stringify(products), 'utf8', (err) => {
//       console.log(err);
//     });

//     // readFile(p, 'utf8', (err, data) => {
//     //   let products = [];
//     //   if (err) {
//     //     console.log(err);
//     //     return;
//     //   }
//     //   console.log('data', data);
//     //   console.log(typeof data);
//     //   //   products = data;
//     //   products.push(this);
//     //   writeFile(p, products, 'utf8', (err) => {
//     //     if (err) throw err;
//     //     console.log('File is created successfully.');
//     //   });
//     //   console.log('products', products);
//     // });
//   }

//   static fetchAll(cb) {
//     const p = path.join(
//       path.dirname(require.main.filename),
//       'data',
//       'products.json'
//     );
//     readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       }
//       cb(JSON.parse(fileContent));
//     });
//   }
// };
