var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  userType: String,
  ordersIds : [{
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  }],
});

var User = mongoose.model('User', userSchema);

module.exports = User;