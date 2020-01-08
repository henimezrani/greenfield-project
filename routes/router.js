var express = require('express');
var mongoose = require('mongoose');
var db = require('../database-mongo/index');
var User = require ('../database-mongo/models/userModel.js')
var Product = require ('../database-mongo/models/productModel.js')
var Order = require ('../database-mongo/models/orderModel.js')
var UserBehaviorLogs = require ('../database-mongo/models/userBehaviorLogsModel.js')
var AdminProductsLogs = require ('../database-mongo/models/adminProductsLogsModel.js')
const router = express.Router();

router.get('/api/test', (req, res) => {
  res.send("tesing Express route")
})

router.post('/api/add/user', (req, res, next)=> {

  var {first_name, last_name, email, password, userType} = req.body

  const newUser = new User({
    first_name,
    last_name,
    email,
    password,
    userType
  });
  newUser.save((err, user) => {
    console.log(newUser.first_name)
    if (err) return console.log(err);
    next();
  })
  const userLog = new UserBehaviorLogs({
    type: 'Account Creation',
    userId: newUser._id,
    time: new Date()
  });
  userLog.save(function(err, logSaved){
    if(err){return next(err);}
    res.end();
  });
}) // tested

// Admin and Customer Operations

router.get('/api/products/:id', (req, res)=> {
  var productId = req.params.id;
  var userId = req.body.userId
  Product.findById(productId)
    .then(product => {
      const userLog = new UserBehaviorLogs({
        type: 'Checking',
        productId: productId,
        time: new Date()
      })
      if (userId) {
        userLog.userId = userId
      }
      userLog.save(function(err, logSaved){
        if(err){return next(err);}
        res.end();
      });
      return product;
    })
    .then(product => {
      if (!product) return res.status(404).end()
      return res.json(product)
    })
    .catch(err => next(err))
}) // tested, send the user data so that the checking is associated with the userId

// Admin Operations

router.get('/api/admin_products', (req, res)=> {
  Product.find((err, products) => {
      err ? res.status(500).send(err) : res.json(products)
  })
}) // tested

router.get('/api/users', (req, res)=> {
  User.find((err, users) => {
      err ? res.status(500).send(err) : res.json(users)
  })
}) // tested

router.put('/api/update/product/:id', (req, res, next)=> {
  var productId = req.params.id
  var {title, description, brand, price, availability, image, opinions, rating, size, tags, color, category} = req.body

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
}) // tested

router.put('/api/updateOneField/product/:id', (req, res, next)=> {

  // This method is similar to the previous update
  // For this function, you need to set the object in the front and pass the data as object named data
  // you will need to check if
  var productId = req.params.id
  var data = req.body.data

  Product.findById(productId, (err, product) => {
    if (err) return console.log(err);

    product.set( data );
    product.save(function (err, updatedItem) {
      if (err) return console.log(err);
      console.log('here')
      next();
    });
  }).then(()=>{
    const productsLog = new AdminProductsLogs({
      type: 'Update',
      time: new Date(),
      productId: productId
    });
    console.log("updated")
    productsLog.save(function(err, logSaved){
      if(err){return next(err);}
      res.end();
    });
  }).catch(err => {
    console.log(err)
    next(err);
  })
}) // tested

router.put('/api/update/availability/:id', (req, res, next)=> {
  console.log(req.body)
  var productId = req.params.id
  var availability = req.body.availability

  Product.findById(productId, (err, product) => {
    if (err) return console.log(err);

    product.set({availability});
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
}) // tested

router.post('/api/add/product', (req, res, next)=> {

  var {title, description, brand, price, availability, image, opinions, rating, size, tags, color, category} = req.body

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
}) // tested

router.get('/api/orders', (req, res)=> {
  Order.find((err, orders) => {
      err ? res.status(500).send(err) :
      res.json(orders)
  })
}) // tested

router.put('/api/update/order_status/:id', (req, res)=> {

  var orderId = req.params.id
  var status = req.body.status

  Order.findById(orderId, (err, order) => {
    if (err) return console.log(err);

    order.set({status});
    order.save(function (err, updatedStatus) {
      if (err) return console.log(err);
      res.end()
    });
  })
}) // tested

router.delete('/api/delete/product/:id', (req, res, next)=> {
  const id = req.params.id
  Product.findByIdAndRemove(id, (err, product) => {
    if (err) return handleError(err);
    res.send('item: '+id+' deleted');
  })
  .then(()=>{
    const logDelete = new AdminProductsLogs({
      type: 'Delete',
      time: new Date(),
      productId: id
    });
    logDelete.save(function(err, product){
      if(err){return next(err);}
      res.end();
    });
  }).catch(err => next(err));
}) // tested

router.get('/api/logs/users', (req, res)=> {
  UserBehaviorLogs.find((err, userLogs) => {
      err ? res.status(500).send(err) :
      res.json(userLogs)
  })
}) // tested

router.get('/api/logs/products', (req, res)=> {
  AdminProductsLogs.find((err, productLogs) => {
      err ? res.status(500).send(err) :
      res.json(productLogs)
  })
}) // tested

// Customer Operations

router.get('/api/customer_products', (req, res)=> {
  Product.find({availability: true},(err, products) => {
      err ? res.status(500).send(err) : res.json(products)
  })
}) // tested

router.post('/api/add/orders', (req, res, next)=> {

  var {userId, delivery_info, card_info, products, payment_method, total_order_price} = req.body

  const newOrder = new Order({
    userId,
    delivery_info,
    products,
    payment_method,
    total_order_price
  });

  if (newOrder.payment_method === "Credit Card") {
    newOrder.card_info = card_info
  }

  newOrder.save((err, order) => {
    if (err) return console.log(err);
    res.end();
  })
}) // tested

router.get('/api/orders/:userId', (req, res)=> {

  var userId = req.params.userId

  Order.find({userId}, (err, orders) => {
      err ? res.status(500).send(err) :
      res.json(orders)
  })
}) // tested

router.put('/api/update/deleteProductFromOrder/:id', (req, res, next)=> {
  var orderId = req.params.id
  var productId = req.body.productId

  Order.findById(orderId, (err, order) => {
    if (err) return console.log(err);

    var newProducts = order._doc.products
    var index = -1;

    newProducts.map((elem, i) => {
      if (JSON.stringify(elem._doc.productId) === JSON.stringify(productId)) {
        index = i
      }
    })
    if (index > -1) {
      newProducts.splice(index, 1);
    }

    order.set({products: newProducts});
    order.save(function (err, updatedStatus) {
      if (err) return console.log(err);
      next();
    });
  })
}) // tested, working but poor code

module.exports = router;