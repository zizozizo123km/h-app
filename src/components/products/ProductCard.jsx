import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProductCard Component
 * A modern, responsive card component for displaying product information.
 * Features: Image, Name, Price, Stock Status, and Add to Cart button.
 */
const ProductCard = ({ product }) => {
  // Helper function for professional currency formatting
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // Adjust currency code as needed (e.g., 'EUR', 'SAR')
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl 
                 transition-all duration-300 overflow-hidden flex flex-col h-full"
      aria-labelledby={`product-name-${product.id}`}
    >
      {/* Product Image Area */}
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:h-72 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Status Badge (e.g., New) */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wider">
            New
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Name and Link */}
        <div className="flex justify-between items-start mb-2 flex-grow">
          <h3
            id={`product-name-${product.id}`}
            className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight"
          >
            {/* Absolute inset link for better click area */}
            <a href={`/products/${product.id}`} className="hover:text-indigo-600 transition duration-150">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
        </div>

        {/* Price and Stock Status */}
        <div className="mt-auto pt-2">
          <p className="text-3xl font-extrabold text-indigo-600 mb-1">
            {formattedPrice}
          </p>
          <p className={`text-sm font-medium ${product.isInStock ? 'text-green-600' : 'text-red-500'}`}>
            {product.isInStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0">
        <button
          onClick={() => console.log(`Adding product ${product.id} to cart`)}
          disabled={!product.isInStock}
          aria-label={`Add ${product.name} to cart`}
          className={`w-full py-3 rounded-lg text-white font-bold transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${product.isInStock
              ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
              : 'bg-gray-400 cursor-not-allowed opacity-80'
            }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    isInStock: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductCard;