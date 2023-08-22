const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const userCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema] 
});

module.exports.UserCart = mongoose.model('UserCart', userCartSchema);

