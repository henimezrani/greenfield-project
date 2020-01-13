var mongoose = require('mongoose');

// This model saves the messages that users leave in the footer of the webpage in case they have any inquiries

var inquirySchema = mongoose.Schema({

  email : String,
  message: String
});

var Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;