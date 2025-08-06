import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ShopEase</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-sm text-gray-700">
                  Hello, {user.name}
                </span>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700"
                  >
                    Admin
                  </Link>
                )}
                <Link to="/orders" className="p-2 text-gray-600 hover:text-blue-600">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}
