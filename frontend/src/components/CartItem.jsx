import React from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  
  // Safely handle missing item or product
  if (!item || !item.product) {
    console.error('Invalid cart item:', item);
    return null;
  }
  
  const { product, quantity } = item;

  // Safely handle missing product data
  if (!product || !product._id) {
    return (
      <div className="flex items-center py-4 border-b">
        <div className="flex-grow">
          <p className="text-red-500">Invalid product</p>
        </div>
        <button
          onClick={() => removeFromCart(product?._id || 'invalid')}
          className="text-red-500 hover:text-red-700"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Ensure the image URL is properly formed
  const imageUrl = product.imageUrl?.startsWith('http') 
    ? product.imageUrl 
    : `http://localhost:5000${product.imageUrl}`;

  const handleRemove = () => {
    removeFromCart(product._id);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product._id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product._id, quantity - 1);
    } else {
      removeFromCart(product._id);
    }
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 w-20 h-20 mr-4">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain rounded"
          onError={(e) => {
            console.log('Product image failed to load:', imageUrl);
            e.target.src = process.env.PUBLIC_URL + '/fallback-product.png';
          }}
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleDecreaseQuantity}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="mx-3 w-6 text-center">{quantity}</span>
        <button
          onClick={handleIncreaseQuantity}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-6 text-right">
        <p className="font-semibold">₹{product.price * quantity}</p>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 mt-1 flex items-center text-sm"
        >
          <Trash className="h-4 w-4 mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem; 