import React, { useState, useEffect } from 'react';
import { getStores } from '../services/api';
import StoreCard from '../components/StoreCard';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStores();
      setStores(data);
      setLoading(false);
    } catch (err) {
      console.error('Error in HomePage:', err);
      setError('Failed to load stores. Please try again later.');
      setLoading(false);
      toast.error('Could not load stores. Please check if the backend server is running.');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading stores...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hyperlocal Stores</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse and shop from local stores near you. Get fresh fruits and vegetables delivered to your doorstep.
        </p>
      </div>

      {error && (
        <div className="mb-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <button 
              onClick={fetchStores} 
              className="ml-4 inline-flex items-center text-red-700 hover:text-red-900"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </button>
          </div>
        </div>
      )}

      {!error && stores.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No stores found</h3>
          <p className="text-gray-600">Please check back later for available stores.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage; 