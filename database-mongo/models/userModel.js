var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  id_facebook : String,
  email_facebook : String,
  email: {
    type: String,
    unique: true
  },
  hashedPassword: String,
  userType: {
    type: "String",
    default: "Customer"
  },
  register_date: {
    type: "String",
    default: Date.now
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;

