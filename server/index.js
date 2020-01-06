var express = require('express');
var bodyParser = require('body-parser');

// import models

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function (req, res) {
  res.json("hi");
});

var port = 8080;

app.listen(port, function() {
  console.log(`listening on http://localhost:${port}`);
});

