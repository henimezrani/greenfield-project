var express = require('express');
var mongoose = require('mongoose');
var db = require('../database-mongo/index');
var User = require ('../database-mongo/models/userModel.js')
var Product = require ('../database-mongo/models/productModel.js')
var Order = require ('../database-mongo/models/orderModel.js')
var UserBehaviorLogs = require ('../database-mongo/models/userBehaviorLogsModel.js')
var AdminProductsLogs = require ('../database-mongo/models/adminProductsLogsModel.js')
const router = express.Router();

router.get('/api/products', (req, res)=> {
  Product.find((err, products) => {
      err ? res.status(500).send(err) : res.json(products)
  })
})

router.get('/api/products/:id', (req, res)=> {
  var productId = req.params.id;
  Product.findById(productId)
    .then(product => {
      if (!product) return res.status(404).end()
      return res.json(product)
    })
    .catch(err => next(err))
})

router.put('/api/update/:id', (req, res, next)=> {

  var productId = req.params.id
  var title = req.body.title
  var description = req.body.description
  var brand = req.body.brand
  var price = req.body.price
  var availability = req.body.availability
  var image = req.body.image
  var opinions = req.body.opinions
  var rating = req.body.rating
  var size = req.body.size
  var tags = req.body.tags
  var color = req.body.color
  var category = req.body.category

  Product.findById(productId, (err, product) => {
    if (err) return console.log(err);

    product.set({ title, description, brand, price, availability, image, opinions, rating, size, tags, color, category });
    product.save(function (err, updatedItem) {
      if (err) return console.log(err);
      next();
    });
  }).then(()=>{
    const productsLog = new AdminProductsLogs({
      type: 'Update',
      time: new Date(),
      productId: productId
    });
    productsLog.save(function(err, logSaved){
      if(err){return next(err);}
      res.end();
    });
  }).catch(err => next(err));
})

router.post('/add/product', (req, res, next)=> {

  var title = req.body.title
  var description = req.body.description
  var brand = req.body.brand
  var price = req.body.price
  var availability = req.body.availability
  var image = req.body.image
  var opinions = req.body.opinions
  var rating = req.body.rating
  var size = req.body.size
  var tags = req.body.tags
  var color = req.body.color
  var category = req.body.category

  const newProduct = new Product({
    title,
    description,
    brand,
    price,
    availability,
    image,
    opinions,
    rating,
    size,
    tags,
    color,
    category
  });
  newProduct.save((err, product) => {
    if (err) return console.log(err);
    next();
  })
  const productsLog = new AdminProductsLogs({
    type: 'Create',
    time: new Date(),
    productId: newProduct._id
  });
  productsLog.save(function(err, logSaved){
    if(err){return next(err);}
    res.end();
  });
})