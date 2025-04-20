import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const StoreCard = ({ store }) => {
  // Ensure the image URL is properly formed
  const imageUrl = store.imageUrl.startsWith('http') 
    ? store.imageUrl 
    : `https://hyperstore.onrender.com${store.imageUrl}`;

  return (
    <Link 
      to={`/store/${store._id}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={store.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('Image failed to load:', imageUrl);
            e.target.src = process.env.PUBLIC_URL + '/fallback-store.png';
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{store.name}</h3>
        <div className="flex items-center text-gray-500 mt-2">
          <MapPin className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 mr-1" />
          <span>{store.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;