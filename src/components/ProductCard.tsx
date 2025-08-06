import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-blue-600 font-medium">{product.category}</span>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
