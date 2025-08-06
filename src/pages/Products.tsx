import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Filter } from 'lucide-react';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h4 className="font-medium mb-3">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
