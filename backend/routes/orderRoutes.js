const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  getOrders 
} = require('../controllers/orderController');

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById);

module.exports = router; 