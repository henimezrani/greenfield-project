const mongoose = require('mongoose');

const adminProductsLogsSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  productId : { // User reference
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  time: Date
});

var AdminProductsLogs = mongoose.model('AdminProductsLogs', adminProductsLogsSchema);

module.exports = AdminProductsLogs;