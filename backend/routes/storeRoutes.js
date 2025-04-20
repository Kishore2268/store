const express = require('express');
const router = express.Router();
const { 
  getStores, 
  getStoreById, 
  createStore 
} = require('../controllers/storeController');

router.route('/').get(getStores).post(createStore);
router.route('/:id').get(getStoreById);

module.exports = router; 