var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greenfield');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('Database geekghosts connected successfully');
});

module.exports = db