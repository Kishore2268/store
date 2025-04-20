import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  // Ensure the image URL is properly formed
  const imageUrl = product.imageUrl.startsWith('http') 
    ? product.imageUrl 
    : `http://localhost:5000${product.imageUrl}`;
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setIsAdding(false), 500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <div className="h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain"
          onError={(e) => {
            console.log('Image failed to load:', imageUrl);
            e.target.src = process.env.PUBLIC_URL + '/fallback-product.png';
          }}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-xl font-bold text-primary-600 mt-2">₹{product.price}</p>
        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full flex items-center justify-center btn ${
              isAdding ? 'bg-primary-400' : 'btn-primary'
            }`}
          >
            <Plus className="h-5 w-5 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;