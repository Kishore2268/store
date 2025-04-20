import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoreById, getProductsByStore } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, ArrowLeft, ShoppingCart, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const StorePage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { cart } = useCart();
  
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safely access cart properties
  const cartItems = cart?.items || [];
  const cartTotalQuantity = cart?.totalQuantity || 0;

  const fetchStoreAndProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const storeData = await getStoreById(storeId);
      const productsData = await getProductsByStore(storeId);
      
      setStore(storeData);
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      console.error('Error in StorePage:', err);
      setError('Failed to load store details. Please try again later.');
      setLoading(false);
      toast.error('Could not load store or products. Please check if the backend server is running.');
    }
  };

  useEffect(() => {
    fetchStoreAndProducts();
  }, [storeId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading store details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button - always show this */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Stores
      </button>
      
      {/* Error display with retry button */}
      {error && (
        <div className="mb-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <button 
              onClick={fetchStoreAndProducts} 
              className="ml-4 inline-flex items-center text-red-700 hover:text-red-900"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Store Details */}
      {!error && store && (
        <>
          {/* Store Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="w-full md:w-1/3 md:mr-6 mb-4 md:mb-0">
                <img 
                  src={store.imageUrl.startsWith('http') ? store.imageUrl : `https://hyperstore.onrender.com${store.imageUrl}`} 
                  alt={store.name} 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    console.log('Store image failed to load:', store.imageUrl);
                    e.target.src = process.env.PUBLIC_URL + '/fallback-store.png';
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
                <p className="text-gray-600 mb-4">{store.location}</p>
                
                {cartItems.length > 0 && (
                  <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center btn btn-primary"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    View Cart ({cartTotalQuantity} items)
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Products</h2>
            
            {products.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products available</h3>
                <p className="text-gray-600">This store doesn't have any products at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StorePage;