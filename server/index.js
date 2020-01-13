var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../react-client/dist'));
app.use('/', require('../routes/router'));

var port = 8080;

app.listen(port, function() {
  console.log(`listening on http://localhost:${port}`);
});

// Bilel Addition here :

const verifyToken = require('./Middleware/verifyToken')


app.post('/api/test', verifyToken, (req, res) => { // session verification
  res.json({posts: {title:'post test 1 '}})
})

app.get('*', (req,res)=> {
  res.sendFile(path.join(__dirname, '/../react-client/dist', 'index.html'));
})