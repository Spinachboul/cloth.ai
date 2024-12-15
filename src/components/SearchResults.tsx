import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './Filters';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  storeName: string;
  similarity: number;
}

export default function ResultsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    stores: [] as string[]
  });

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await axios.get('/api/search');
        setProducts(response.data.matches);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch results', error);
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  const filteredProducts = products.filter(product => 
    product.price >= filters.minPrice && 
    product.price <= filters.maxPrice &&
    (filters.stores.length === 0 || filters.stores.includes(product.storeName))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-1/4 pr-6">
          <Filters 
            onFilterChange={setFilters}
            stores={[...new Set(products.map(p => p.storeName))]}
          />
        </div>

        {/* Results Grid */}
        <div className="w-3/4">
          <h1 className="text-2xl font-bold mb-6">
            {filteredProducts.length} Similar Items Found
          </h1>
          
          <div className="grid grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No products match your current filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}