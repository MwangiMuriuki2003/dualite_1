import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function OrderConfirmation() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <p className="text-gray-600">Order #: ORD-2025-001</p>
          <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
          <p className="text-gray-600">You will receive a confirmation email shortly.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            Track Your Order
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/products"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
