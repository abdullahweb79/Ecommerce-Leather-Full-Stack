const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['leather-duffle-bags', 'duffle-bags', 'laptop-bags', 'accessories', 'sports-bags']
  },
  image: { type: String, default: 'default-product.jpg' },
  price: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
