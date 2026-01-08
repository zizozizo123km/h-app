import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

const navItems = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المتجر', href: '/shop' },
  { name: 'التصنيفات', href: '/categories' },
  { name: 'العروض', href: '/deals' },
];

// Placeholder for cart item count (in a real app, this would come from context/redux)
const cartItemCount = 3;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-extrabold text-indigo-700 tracking-tight hover:text-indigo-600 transition duration-150">
              E-Shop
            </a>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex lg:space-x-8 lg:space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Icons and Actions (Right) */}
          <div className="flex items-center space-x-4 space-x-reverse">
            
            {/* Search Icon (Desktop/Tablet) */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-700 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* User Profile */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-700 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="User Profile"
            >
              <User className="h-6 w-6" />
            </button>

            {/* Shopping Cart */}
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-indigo-700 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`View ${cartItemCount} items in cart`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
                <a
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition duration-150"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    تسجيل الدخول / إنشاء حساب
                </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;