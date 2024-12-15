import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    productUrl: string;
    storeName: string;
    similarity: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-64 w-full">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
          {product.storeName}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {(product.similarity * 100).toFixed(1)}% Match
          </span>
        </div>
        
        <a 
          href={product.productUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          View Product
        </a>
      </div>
    </div>
  );
}

export default ProductCard;