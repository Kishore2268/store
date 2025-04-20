const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Models
const Store = require('./models/Store');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Sample data
const stores = require('./data/stores');
const products = require('./data/products');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Create directories for files if they don't exist
const createDirs = () => {
  const dirs = [
    './uploads',
    './uploads/stores',
    './uploads/products',
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Import data into DB
const importData = async () => {
  try {
    createDirs();
    
    // Clear existing data
    await Store.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    
    console.log('Data cleaned...');
    
    // Insert stores
    const createdStores = await Store.insertMany(stores);
    
    // Create a map for store name to id
    const storeMap = {};
    createdStores.forEach(store => {
      storeMap[store.name] = store._id;
    });
    
    // Add store IDs to products
    const productsWithStoreIds = products.map(product => {
      return {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        store: storeMap[product.storeName]
      };
    });
    
    await Product.insertMany(productsWithStoreIds);
    
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Store.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    
    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arg to determine action
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 