import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          Hyperlocal Store
        </Link>
        
        <nav>
          <Link to="/cart" className="flex items-center gap-1 relative">
            <ShoppingCart className="h-6 w-6 text-primary-600" />
            {cart.totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 