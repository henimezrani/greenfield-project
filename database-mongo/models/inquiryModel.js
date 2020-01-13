var mongoose = require('mongoose');

var inquirySchema = mongoose.Schema({

  email : String,
  message: String
});

var Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;