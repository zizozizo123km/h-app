import React, { useState, useEffect, useMemo } from 'react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

// --- MOCK DATA & TYPES (In a real project, these would be external) ---

/**
 * @typedef {object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} rating
 * @property {string} imageUrl
 * @property {boolean} isNew
 */

/** @type {Product[]} */
const MOCK_PRODUCTS = [
  { id: 101, name: "سماعات رأس لاسلكية فاخرة", price: 199.99, rating: 4.8, imageUrl: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Headphones", isNew: true },
  { id: 102, name: "ساعة ذكية رياضية (الجيل 5)", price: 249.00, rating: 4.5, imageUrl: "https://via.placeholder.com/400x300/10b981/ffffff?text=Smart+Watch", isNew: false },
  { id: 103, name: "شاحن سريع 100 واط", price: 49.50, rating: 4.9, imageUrl: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Charger", isNew: true },
  { id: 104, name: "كاميرا احترافية 4K", price: 899.99, rating: 4.2, imageUrl: "https://via.placeholder.com/400x300/ef4444/ffffff?text=Camera", isNew: false },
  { id: 105, name: "ماوس ألعاب مريح", price: 59.99, rating: 4.7, imageUrl: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Gaming+Mouse", isNew: false },
  { id: 106, name: "جهاز لوحي صغير 8 بوصة", price: 320.00, rating: 4.6, imageUrl: "https://via.placeholder.com/400x300/06b6d4/ffffff?text=Tablet", isNew: true },
];

// --- SUB-COMPONENTS ---

/**
 * Product Card Skeleton for Loading State
 */
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse border border-gray-100">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-blue-200 rounded w-1/4"></div>
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

/**
 * Individual Product Card Component
 * @param {object} props
 * @param {Product} props.product
 */
const ProductCard = ({ product }) => {
  const formattedPrice = useMemo(() => product.price.toFixed(2), [product.price]);

  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden group border border-gray-100">
      {/* Image and Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            جديد
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 md:p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-2" title={product.name}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3 text-sm">
          <div className="flex text-yellow-400 ltr:mr-2 rtl:ml-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-gray-600 font-medium">({product.rating})</span>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <p className="text-2xl font-extrabold text-blue-600">
            ${formattedPrice}
          </p>
          <button
            aria-label={`أضف ${product.name} إلى السلة`}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => console.log(`Added ${product.name} to cart`)}
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---

/**
 * Product List Component
 * Fetches and displays a grid of products.
 * @param {object} props
 * @param {string} [props.title] - Optional title for the section.
 */
export default function ProductList({ title = "منتجاتنا المميزة" }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API Fetching
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simulate network delay
    const timer = setTimeout(() => {
      try {
        // In a real app, this would be axios.get('/api/products')
        setProducts(MOCK_PRODUCTS);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("تعذر تحميل المنتجات. يرجى المحاولة لاحقاً.");
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      // Display 8 skeleton cards while loading
      return (
        <>
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </>
      );
    }

    if (error) {
      return (
        <div className="col-span-full text-center p-10 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-bold text-xl mb-2">خطأ في التحميل</p>
          <p>{error}</p>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="col-span-full text-center p-10 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          <p className="font-bold text-xl mb-2">لا توجد منتجات حالياً</p>
          <p>نحن نعمل على إضافة المزيد من العناصر قريباً.</p>
        </div>
      );
    }

    // Render the actual product cards
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50" aria-labelledby="product-list-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="product-list-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 md:mb-12 text-center">
          {title}
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}