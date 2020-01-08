var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geekghosts', { useNewUrlParser: true }).then((err) => {
  if (err) throw err
  console.log('Database geekghosts connected successfully');
})
var db = mongoose.connection;

module.exports = db;

