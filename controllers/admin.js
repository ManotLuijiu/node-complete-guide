const Product = require('../models/Product');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'เพิ่มสินค้า',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'แก้ไขสินค้า',
      path: '/admin/edit-product',
      editing: editMode,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  console.log('postEditProduct');
  const { prodId, title, imageUrl, price, description } = req.body;
  console.table([
    { id: prodId, title: title, price: price, desc: description },
  ]);
  const updatedProduct = new Product(
    prodId,
    title,
    imageUrl,
    price,
    description
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'จัดการสินค้า',
      path: '/admin/products',
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const { prodId } = req.body;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
