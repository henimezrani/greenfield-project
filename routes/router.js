var express = require('express');
var mongoose = require('mongoose');
var db = require('../database-mongo/index');
var User = require ('../database-mongo/models/userModel.js')
var Product = require ('../database-mongo/models/productModel.js')
var Order = require ('../database-mongo/models/orderModel.js')
var Inquiry = require ('../database-mongo/models/inquiryModel.js')
var UserBehaviorLogs = require ('../database-mongo/models/userBehaviorLogsModel.js')
var AdminProductsLogs = require ('../database-mongo/models/adminProductsLogsModel.js')
const router = express.Router();
require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../server/Middleware/verifyToken')

/*This router is pretty long and pretty complicated to understant. even though the name describes each request by itself, we have some good news for you
/*
/*
/*
/*
/*
/* We provided an API.txt file that describes each function, the request body, the response you get from the reaquest as well as an example for each*/

// With that said, no need to read a single line of code from here!



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

router.get("/api/allproducts", (req, res) => {
  Product.find().then(data => {
    res.json(data).status(200);
  });
});

router.get('/api/users', (req, res)=> {
  User.find((err, users) => {
    err ? res.status(500).send(err) : res.json(users)
  })
}) // tested

router.get('/api/getUserById/:id', (req, res)=> {
  userId = req.params.id
  User.findById(userId,(err, user) => {
      err ? res.status(500).send(err) : res.status(200).json(user)

  })
}) // tested

router.put('/api/update/product/:id', (req, res, next)=> {
  var productId = req.params.id
  var {title, description, brand, price, availability, image, opinions, rating, size, tag, color, category} = req.body
  var data = {}
  for (var key in req.body) {
    if(req.body[key]) {
      data[key] = req.body[key]
    }
  }

  Product.findById(productId, (err, product) => {
    if (err) return console.log(err);

    product.set(data);
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
  }).catch(err => {
    console.log(err)
    next(err);
  })
}) // tested

router.put('/api/update/availability/:id', (req, res, next)=> {
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

  var {title, description, brand, price, image, size, tag, color, category} = req.body

  const newProduct = new Product({
    title,
    description,
    brand,
    price,
    image,
    size,
    tag,
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

router.put('/api/update/productRating/:id', (req, res, next)=> {
  var productId = req.params.id
  var customer_rating = req.body.customer_rating

  Product.findById(productId, (err, product) => {
    if (err) return console.log(err);

    var current_Rating = product._doc.rating
    var current_opinions = product._doc.opinions

    var new_rating = (((current_opinions * current_Rating) + customer_rating) / (current_opinions + 1))

    var new_opinions = current_opinions + 1

    var rounded_rating = Math.round( new_rating * 10 ) / 10

    product.set({opinions: new_opinions, rating: rounded_rating});
    product.save(function (err, updatedProduct) {
      if (err) return console.log(err);
      next();
    });
  })
}) // tested

router.get('/api/customer_products/women', (req, res)=> {
  Product.find({availability: true, category: "women"},(err, products) => {
    err ? res.status(500).send(err) : res.json(products)
  })
}) // tested

router.get('/api/customer_products/men', (req, res)=> {
  Product.find({availability: true, category: "men"},(err, products) => {
    err ? res.status(500).send(err) : res.json(products)
  })
}) // tested

router.get('/api/customer_products/women/:tag', (req, res)=> {
  var filter_tag = req.params.tag
  Product.find({availability: true, category: "women", tag: filter_tag},(err, products) => {
    err ? res.status(500).send(err) : res.json(products)
  })
}) // tested

router.get('/api/customer_products/men/:tag', (req, res)=> {
  var filter_tag = req.params.tag
  Product.find({availability: true, category: "men", tag: filter_tag},(err, products) => {
    err ? res.status(500).send(err) : res.json(products)
  })
}) // tested

router.post('/api/add/inquiry', (req, res, next)=> {

  var {email, message} = req.body

  const newInquiry = new Inquiry({
    email,
    message
  });
  newInquiry.save((err, inquiry) => {
    if (err) return console.log(err);
    res.end();
  })
}) // tested

router.post('/api/addmultipleproducts', (req, res)=> {
  products = req.body.products
  var count = 0
  products.map((elem)=> {
    var {title, description, brand, price, image, size, tag, color, category} = elem
    count++
    const newProduct = new Product({
      title,
      description,
      brand,
      price,
      image,
      size,
      tag,
      color,
      category
    });
    newProduct.save((err, product) => {
      if (err) return console.log(err);
      if (count === products.length) {
        res.end();
      }
    })
  })

})


/****************************************************************/
//Authentication Bilel

router.post('/api/user/register', (req, res) => {

  const { name, email, password, confirmedPassword } = req.body

  User.find({email},(err, user) => {
    if (err) {
      res.status(500).send(err)
    }
    if (user.length !== 0) {
      res.json({ registred: false, msg: "user exist !" }).status(301)
    } else {
      //check the confirmed password match with the password
      if (password === confirmedPassword) {
        var token;
        //hash the password and saved it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) reject(err)

          const newUser = new User({
            name,
            email,
            hashedPassword
          });
          newUser.save((err, user) => {
            if (err) return console.log(err);
            token = jwt.sign(
              { _id: user.id },// id of new user created
              process.env.TOKEN_SECRET,
              { expiresIn: 3600 }
            )
            const userLog = new UserBehaviorLogs({
              type: 'Account Creation',
              userId: newUser._id,
              time: new Date()
            });
            userLog.save(function(err, logSaved){
              if(err){return next(err);}
              res.header('auth-token', token) //saving the token in the header !!
              res.status(200).json({ registred: true, msg: "user registred!", token, userId: user._id})
            });
          })
        })

      } else {
        res.status(401).send({ registred: false, msg: "wrong password !" })
      }
    }
  })

})

router.post('/api/user/login',  (req, res) => {

  const { email, password } = req.body

  User.findOne({email},(err, user) => {
    if (err) {
      res.status(500).send(err)
    }
    if (user.length === 0) {
      res.send("user does not exist")
    } else {
      //if the userName exist in database check the password
      bcrypt.compare(password, user.hashedPassword)
      .then((match) => {
        if (!match) {
          res.status(403).json({ login: false, msg: "incorrect password !" })

        } else {
          //create and assign a token
          const token = jwt.sign(
            { _id: user.id },// id from database
            process.env.TOKEN_SECRET,
            { expiresIn: 3600 }
            )
          res.header('auth-token',token) //saving the token in the header !!
          res.status(200).json({ login: true, msg: "correct password !", token, userId: user._id})
          //redirect user
        }
      })
    }
  })

})

router.post('/api/test', verifyToken, (req, res) => { // session verification
  res.status(200).send({hasToken: true, userId: req.user})
})

module.exports = router;

