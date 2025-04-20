import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Safely access cart properties
  const cartItems = cart?.items || [];
  const cartTotalQuantity = cart?.totalQuantity || 0;
  const cartTotalAmount = cart?.totalAmount || 0;
  const cartStoreId = cart?.storeId || null;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Prepare order data
      const orderData = {
        customerName,
        orderItems: cartItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotalAmount,
        store: cartStoreId
      };
      
      // Submit order
      const createdOrder = await createOrder(orderData);
      
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate('/order-confirmation', { state: { order: createdOrder } });
    } catch (err) {
      toast.error('Failed to place order. Please try again.');
      setIsSubmitting(false);
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add items to your cart to place an order.</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Browse Stores
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="divide-y">
                {cartItems.map(item => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartTotalQuantity} items)</span>
                  <span>₹{cartTotalAmount}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-xl">₹{cartTotalAmount}</span>
                </div>
              </div>
              
              <form onSubmit={handlePlaceOrder}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setError('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn ${isSubmitting ? 'bg-primary-400' : 'btn-primary'}`}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;