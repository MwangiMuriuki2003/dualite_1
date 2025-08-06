import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <motion.div
              key={item.id}
              layout
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$9.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${(getTotalPrice() + 9.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
          </div>
          
          <Link
            to="/checkout"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors block text-center font-semibold"
          >
            Proceed to Checkout
          </Link>
          
          <Link
            to="/products"
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors block text-center mt-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
