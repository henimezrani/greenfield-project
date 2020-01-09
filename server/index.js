const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index.js')
const dotenv = require('dotenv')

const verfiyToken = require('./Middleware/verifyToken')
dotenv.config()
// import models

const app = express();
// import auth router
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../react-client/dist'));

//import routes
app.get('/', function (req, res) {
  res.json("hi");
});

const authRoute = require('./routes/auth')
const postRoute = require('./routes/test')

//router middleware
app.use('/api/user', authRoute)
app.post('/api/post', verfiyToken, (req, res) => {
  console.log('here')
  res.json({posts: {title:'post test 1 '}})
})


const port = 8080;
app.listen(port, function() {
  console.log(`listening on http://localhost:${port}`);
});

