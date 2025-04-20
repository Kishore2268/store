import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </CartProvider>
  </React.StrictMode>
); 