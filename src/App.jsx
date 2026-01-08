import React from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';

// --- Component: Header ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="/" className="text-3xl font-extrabold text-indigo-700 tracking-tight hover:text-indigo-800 transition duration-200">
          E-Shop
        </a>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-grow max-w-xl mx-12 shadow-sm">
          <input
            type="text"
            placeholder="Search for products, brands, and categories..."
            className="w-full p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />
          <button className="bg-indigo-600 text-white p-3 rounded-r-xl hover:bg-indigo-700 transition duration-200 flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>

        {/* Actions & Mobile Menu Button */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Account */}
          <button className="hidden sm:flex text-gray-600 hover:text-indigo-600 transition duration-200 p-2 rounded-full hover:bg-gray-100">
            <User size={24} />
            <span className="hidden md:inline ml-2 font-medium">Account</span>
          </button>
          
          {/* Cart */}
          <button className="text-gray-600 hover:text-indigo-600 transition duration-200 relative p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={24} />
            {/* Cart count badge */}
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              3
            </span>
            <span className="sr-only">Shopping Cart</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Search Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 p-4 shadow-inner">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700">
              <Search size={20} />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="p-2 text-gray-700 hover:bg-indigo-50 rounded-md font-medium">Home</a>
            <a href="#" className="p-2 text-gray-700 hover:bg-indigo-50 rounded-md font-medium">Categories</a>
            <a href="#" className="p-2 text-gray-700 hover:bg-indigo-50 rounded-md font-medium flex items-center">
                <User size={18} className="mr-2"/> My Account
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Component: Footer ---
const Footer = () => (
  <footer className="bg-gray-900 text-white mt-16">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        
        <div>
          <h4 className="text-lg font-semibold mb-4 text-indigo-400">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-indigo-300 transition">New Arrivals</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Best Sellers</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Sale Items</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-indigo-400">Customer Service</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-indigo-300 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Order Tracking</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-indigo-400">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-indigo-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Press</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-indigo-400">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-indigo-300 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} E-Shop. All rights reserved. Built with React & Tailwind CSS.</p>
      </div>
    </div>
  </footer>
);

// --- Component: Product Card Placeholder ---
const ProductCard = ({ title, price }) => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
        <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">
            Product Image Placeholder
        </div>
        <div className="p-5">
            <h4 className="font-bold text-xl text-gray-800 truncate">{title}</h4>
            <p className="text-2xl font-extrabold text-indigo-600 mt-2">{price}</p>
            <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 flex items-center justify-center space-x-2">
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
            </button>
        </div>
    </div>
);


// --- Main App Component ---
const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-indigo-500 to-purple-600 p-16 rounded-3xl mb-16 text-center shadow-2xl">
            <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
              The Future of Shopping is Here
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Explore curated collections and exclusive deals tailored just for you.
            </p>
            <button className="bg-white text-indigo-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition duration-300 shadow-xl transform hover:scale-105">
              Start Exploring
            </button>
          </section>

          {/* Featured Products Grid */}
          <section>
            <h3 className="text-4xl font-bold text-gray-800 mb-10 border-b-4 border-indigo-500 pb-3 inline-block">
                Featured Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <ProductCard title="Premium Wireless Headphones" price="$249.99" />
              <ProductCard title="Minimalist Leather Wallet" price="$49.00" />
              <ProductCard title="4K Ultra HD Monitor 32-inch" price="$799.50" />
              <ProductCard title="Ergonomic Office Chair Pro" price="$320.00" />
              <ProductCard title="Smart Home Hub Gen 3" price="$129.99" />
              <ProductCard title="Vintage Coffee Maker" price="$85.00" />
              <ProductCard title="High Performance Laptop" price="$1,499.00" />
              <ProductCard title="Designer Sunglasses" price="$150.00" />
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;