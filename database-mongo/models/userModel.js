var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String, // User Name
  email: { // user email
    type: String,
    unique: true
  },
  hashedPassword: String, // user password hashed
  userType: { // type, user of admin
    type: "String",
    default: "Customer"
  },
  register_date: { // date in which the user registered
    type: "String",
    default: Date.now
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;

