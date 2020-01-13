var mongoose = require('mongoose');

// This model describes each product.

var productSchema = mongoose.Schema({
  title: String, // Product title
  description: String, // Brief description about the product
  brand: String, // product brand
  price: Number, // product price
  availability: { // Whenever a product is added, it is set to available, however, if an admin is out of stock, he can set this to be false. the product will not show in the product list anymore.
    type: Boolean,
    default: true
  },
  image: { // product image link taken from the internet, not an upload
    type: String,
    default: "https://gear.nitro.com/content/images/thumbs/default-image_600.png"
  },
  opinions: { // this is used as a counter to count how many submissions for ratings we got. we need this to calculate the exact current rating
    type: Number,
    default: 1
  },
  rating: { // this is the product rating that is updated each time upon rating submission
    type: Number,
    default: 5
  },
  size: [String], // This array contains all the sizes for which this product is available
  tag: String, // This is the product category. ex: Polo, T-shirt, Top...
  color: String, // product color
  category: String // men or women
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;