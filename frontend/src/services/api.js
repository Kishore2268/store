import axios from 'axios';

// Set the base URL for the API
const API_URL = 'https://hyperstore.onrender.com/api';

// Store API
export const getStores = async () => {
  try {
    const response = await axios.get(`${API_URL}/stores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error.response?.data || error.message;
  }
};

export const getStoreById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/stores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching store:', error);
    throw error.response?.data || error.message;
  }
};

// Product API
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response?.data || error.message;
  }
};

export const getProductsByStore = async (storeId) => {
  try {
    const response = await axios.get(`${API_URL}/products/store/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw error.response?.data || error.message;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error.response?.data || error.message;
  }
};

// Order API
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error.response?.data || error.message;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error.response?.data || error.message;
  }
}; 