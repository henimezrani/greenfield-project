const mongoose = require('mongoose');

const userBehaviorLogsSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  productId : { // User reference
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  time: Date
});

var UserBehaviorLogs = mongoose.model('UserBehaviorLogs', userBehaviorLogsSchema);

module.exports = UserBehaviorLogs;

// Tracking of customer behavior