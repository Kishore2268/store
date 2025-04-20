const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { customerName, orderItems, totalAmount, store } = req.body;

    // Validate required fields
    if (!customerName) {
      return res.status(400).json({ message: 'Customer name is required' });
    }

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: 'Total amount is required' });
    }

    if (!store) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    const order = new Order({
      customerName,
      orderItems,
      totalAmount,
      store
    });

    const createdOrder = await order.save();
    
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(`Error creating order: ${error.message}`);
    res.status(400).json({ message: 'Failed to create order', error: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error(`Error getting order by ID: ${error.message}`);
    res.status(500).json({ message: 'Failed to get order', error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('store');
    res.json(orders);
  } catch (error) {
    console.error(`Error getting orders: ${error.message}`);
    res.status(500).json({ message: 'Failed to get orders', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
}; 