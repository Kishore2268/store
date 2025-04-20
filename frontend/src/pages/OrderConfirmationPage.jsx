import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  // Redirect to home if no order data is present
  if (!order) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-primary-600 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank you, {order.customerName}!
        </h1>
        
        <p className="text-gray-600 text-lg mb-8">
          Your order has been placed successfully.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary flex items-center justify-center mx-auto"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 