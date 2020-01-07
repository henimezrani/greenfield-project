var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  customerinfo: {
    userId : [{ // User reference
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    street1: String, // Street line 1
    street2: String, // Street line 2
    city: String, // city
    zip: Number, // Zip code
    country: String, // country
    phone_number: Number, // phone number
    card_number: Number, // Credit Card number
    expiration: Number, // Credit Card Expiration Month and year
    ccv: Number // Last 3 or 4 digits for security
  },
  products: [{
    productId : [{ // User reference
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    }],
    selected_size: String, // The selected size of the item
    quantity: Number // item quantity
    total_product_price: Number, // Item price times its quantity
  }],
  total_order_price: Number // total order price

});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;