const mongoose = require('mongoose');

// This model allows us to track user experience on the website as each time a customer checks or orders a product, it is registered in these logs
// This model can be very useful for product analytics and user experience mapping as it has a date and mapping of all users behavior over the products

const userBehaviorLogsSchema = mongoose.Schema({
  type: { // type of the log (order, checking...)
    type: String,
    required: true,
  },
  userId: { // User who performed the action (taken if the user is logged in)
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  productId : { // The id of the product on which the action was performed
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  time: Date // time at which the action was performed
});

var UserBehaviorLogs = mongoose.model('UserBehaviorLogs', userBehaviorLogsSchema);

module.exports = UserBehaviorLogs;

// Tracking of customer behavior