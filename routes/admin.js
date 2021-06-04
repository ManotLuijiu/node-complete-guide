const express = require('express');

const router = express.Router();

router.use('/add-product', (req, res, next) => {
  console.log('In another middleware - Add Product add');
  res.send(
    '<form action="/product" method="post">\
      <input type="text" name="title">\
      <button type="submit">Submit</button>\
      </input>\
      </form>'
  );
});

router.post('/product', (req, res, next) => {
  const { title } = req.body;
  console.log(title);
  res.redirect('/');
});

module.exports = router;
