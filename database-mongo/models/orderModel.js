var mongoose = require('mongoose');

// The order model describes each customers order from cart to checkout. The choice will be explained as you reed the code

var orderSchema = mongoose.Schema({

  // UserId: necessary to map each order to a specific user. this value lives in the state of the main component whenever a user is logged in
  userId : { // User reference
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

  // The choice of having the delivery info here comes from the fact that we don't want them to be associated with the user himself as we want him to be able to choose a different location each time he passes an order.
  delivery_info: {
    street1: String, // Street line 1
    street2: String, // Street line 2
    city: String, // city
    zip: Number, // Zip code
    country: String, // country
    phone_number: Number // phone number
  },

  // Depending on the choice of the payment method, this field can be left empty if the user chooses to pay cash on delivery.
  card_info: {
    card_number: Number, // Credit Card number
    expiration: Number, // Credit Card Expiration Month and year
    ccv: Number // Last 3 or 4 digits for security
  },

  // Since each product has different sizes and can be ordered in different quantitities, we use the product ref here to be able to access the product details and general but also we want the selected size and quantity which are variables that are not proper to the product itself but to the order.
  products: [{
    product : Object,
    selected_size: String, // The selected size of the item
    quantity: Number, // item quantity
    total_product_price: Number // Item price times its quantity
  }],

  // We want the administrator to track the state of each order/delivery, especially if he is taking care of the delivery himself. For that reason, we need a status field upon submission of the order that can switch states between "pending", "in progress", "cancelled" and "delivered"
  status: {
    type: String,
    default: "Pending"
  },

  // We want the user to have the choice to pay either cash or by credit card
  payment_method: String,

  // Total order price that is calculated by mapping through the products, multiplying each by the quantity.
  total_order_price: Number // total order price
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;

//take off username
//take off email
