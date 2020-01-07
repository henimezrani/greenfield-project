var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  title: String,
  description: String,
  brand: String,
  price: Number,
  availability: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: "https://gear.nitro.com/content/images/thumbs/default-image_600.png"
  },
  opinions: {
    type: Number,
    default: 1
  },
  rating: {
    type: Number,
    default: 5
  },
  size: [String],
  tags: [String],
  color: String,
  category: String
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;