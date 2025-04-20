const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  orderItems: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 