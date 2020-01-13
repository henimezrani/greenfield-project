const mongoose = require('mongoose');

// This Model is used to track major CRUD Operations by the administrators on the products si that whatever happens, the business owner knows who did what.

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