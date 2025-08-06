import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { faker } from '@faker-js/faker';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-2025-001',
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
      { name: 'Phone Case', quantity: 2, price: 19.99 }
    ],
    total: 139.97,
    status: 'delivered' as const,
    createdAt: '2025-01-10',
    estimatedDelivery: '2025-01-15'
  },
  {
    id: 'ORD-2025-002',
    items: [
      { name: 'Smart Watch', quantity: 1, price: 299.99 }
    ],
    total: 309.98,
    status: 'shipped' as const,
    createdAt: '2025-01-12',
    estimatedDelivery: '2025-01-18'
  },
  {
    id: 'ORD-2025-003',
    items: [
      { name: 'Laptop Stand', quantity: 1, price: 49.99 },
      { name: 'USB Cable', quantity: 3, price: 12.99 }
    ],
    total: 88.95,
    status: 'processing' as const,
    createdAt: '2025-01-15',
    estimatedDelivery: '2025-01-22'
  }
];

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle
};

const statusColors = {
  pending: 'text-yellow-600 bg-yellow-100',
  processing: 'text-blue-600 bg-blue-100',
  shipped: 'text-purple-600 bg-purple-100',
  delivered: 'text-green-600 bg-green-100'
};

export function Orders() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {mockOrders.map(order => {
          const StatusIcon = statusIcons[order.status];
          
          return (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{order.id}</h2>
                  <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusColors[order.status]}`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Delivery Information</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    {order.status === 'shipped' && (
                      <p>Tracking number: TRK{faker.string.alphanumeric(10).toUpperCase()}</p>
                    )}
                    {order.status === 'delivered' && (
                      <p className="text-green-600 font-medium">✓ Delivered on {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {mockOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600">When you make your first purchase, it will appear here.</p>
        </div>
      )}
    </div>
  );
}
