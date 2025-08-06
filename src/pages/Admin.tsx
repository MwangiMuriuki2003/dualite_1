import React, { useState } from 'react';
import { Users, Package, DollarSign, TrendingUp, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { faker } from '@faker-js/faker';

// Mock admin data
const mockStats = {
  totalUsers: 1247,
  totalProducts: products.length,
  totalOrders: 856,
  totalRevenue: 145670.50,
  monthlyGrowth: 12.5
};

const mockRecentOrders = Array.from({ length: 5 }, (_, i) => ({
  id: `ORD-2025-${String(i + 1).padStart(3, '0')}`,
  customer: faker.person.fullName(),
  amount: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
  status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
  date: faker.date.recent().toISOString().split('T')[0]
}));

export function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user?.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You don''t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your e-commerce store</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'products', name: 'Products', icon: Package },
            { id: 'orders', name: 'Orders', icon: DollarSign },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.totalOrders.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">${mockStats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockRecentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Products Management</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add Product
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-xs mb-2">{product.category}</p>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <div className="flex space-x-2 mt-3">
                    <button className="text-blue-600 text-sm hover:underline">Edit</button>
                    <button className="text-red-600 text-sm hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {(activeTab === 'orders' || activeTab === 'users' || activeTab === 'settings') && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
          <p className="text-gray-600">This section is under development.</p>
        </div>
      )}
    </div>
  );
}
