import React, { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    stores: string[];
  }) => void;
  stores: string[];
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, stores }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  const handleFilterUpdate = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      stores: selectedStores
    });
  };

  const handleStoreToggle = (store: string) => {
    setSelectedStores(prev => 
      prev.includes(store) 
        ? prev.filter(s => s !== store)
        : [...prev, store]
    );
  };

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <input 
            type="number" 
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min"
            className="w-1/2 border rounded p-2"
          />
          <input 
            type="number" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max"
            className="w-1/2 border rounded p-2"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Stores</h3>
        {stores.map(store => (
          <div key={store} className="flex items-center mb-1">
            <input 
              type="checkbox" 
              id={store}
              checked={selectedStores.includes(store)}
              onChange={() => handleStoreToggle(store)}
              className="mr-2"
            />
            <label htmlFor={store}>{store}</label>
          </div>
        ))}
      </div>

      <button 
        onClick={handleFilterUpdate}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default Filters;