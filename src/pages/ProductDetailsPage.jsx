import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronLeft, Share2, Zap, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

// --- Mock Data & API Simulation ---
const mockProducts = [
  {
    id: 'p101',
    name: 'Apple MacBook Pro 14" M3 Max (128GB RAM, 8TB SSD)',
    category: 'Laptops',
    price: 4999.99,
    discountedPrice: 4499.99,
    rating: 4.8,
    reviewCount: 1540,
    description: 'The ultimate powerhouse for professionals. Featuring the groundbreaking M3 Max chip, a stunning Liquid Retina XDR display, and all-day battery life. Perfect for 3D rendering, video editing, and software development.',
    images: [
      '/images/macbook-pro-main.webp',
      '/images/macbook-pro-side.webp',
      '/images/macbook-pro-keyboard.webp',
      '/images/macbook-pro-ports.webp',
    ],
    stock: 12,
    sku: 'MBP14M3MAX8TB',
    specifications: [
      { key: 'Processor', value: 'Apple M3 Max (16-core CPU, 40-core GPU)' },
      { key: 'RAM', value: '128GB Unified Memory' },
      { key: 'Storage', value: '8TB SSD' },
      { key: 'Display', value: '14.2-inch Liquid Retina XDR (120Hz ProMotion)' },
      { key: 'Color', value: 'Space Black' },
    ],
    variants: [
      { id: 'v1', name: '64GB RAM / 4TB SSD', price: 3999.99 },
      { id: 'v2', name: '128GB RAM / 8TB SSD', price: 4499.99, selected: true },
    ],
  },
  // ... other products
];

const fetchProductDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        resolve({ success: true, data: product });
      } else {
        resolve({ success: false, error: 'Product not found' });
      }
    }, 500); // Simulate network delay
  });
};

// --- Components ---

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5">
      {Array(fullStars).fill().map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star className="absolute w-4 h-4 text-gray-300" />
          <div className="absolute overflow-hidden" style={{ width: '50%' }}>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}
      {Array(emptyStars).fill().map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const ImageGallery = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 border border-gray-100">
        <img
          src={mainImage}
          alt={`${productName} - Main View`}
          className="w-full h-auto object-contain max-h-[500px] transition-transform duration-300 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              mainImage === img ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-gray-200 hover:border-indigo-400'
            }`}
          >
            <img
              src={img}
              alt={`${productName} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductActions = ({ product, selectedVariant, quantity, setQuantity, handleAddToCart, handleAddToWishlist }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">
        ${product.discountedPrice.toFixed(2)}
        {product.price > product.discountedPrice && (
          <span className="ml-3 text-base font-normal text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </span>
        )}
      </h3>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="quantity" className="text-gray-600 font-medium">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
            className="w-20 p-2 border border-gray-300 rounded-lg text-center focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isOutOfStock}
          />
        </div>
        <div className={`text-sm font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'}`}>
          {isOutOfStock ? 'Out of Stock' : product.stock <= 10 ? `Only ${product.stock} left!` : 'In Stock'}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex items-center justify-center w-full px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
            isOutOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform hover:scale-[1.01]'
          }`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {isOutOfStock ? 'Notify Me' : 'Add to Cart'}
        </button>

        <button
          onClick={handleAddToWishlist}
          className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors duration-300"
        >
          <Heart className="w-5 h-5 mr-2" />
          Add to Wishlist
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="w-4 h-4 mr-2 text-green-500" />
          <span>Free Shipping on orders over $500</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4 mr-2 text-blue-500" />
          <span>30-Day Money Back Guarantee</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Zap className="w-4 h-4 mr-2 text-orange-500" />
          <span>Fast Delivery: Get it by tomorrow!</span>
        </div>
      </div>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const loadProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProductDetails(id);
      if (response.success) {
        setProduct(response.data);
        const defaultVariant = response.data.variants.find(v => v.selected) || response.data.variants[0];
        setSelectedVariant(defaultVariant);
        setQuantity(1);
      } else {
        setError(response.error);
        toast.error('Product not found.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      toast.error('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId, loadProduct]);

  const handleAddToCart = () => {
    if (!product || product.stock < quantity) {
      toast.error('Cannot add to cart. Check stock availability.');
      return;
    }
    // Simulate adding to cart
    const item = {
      id: product.id,
      name: product.name,
      variant: selectedVariant?.name,
      price: product.discountedPrice,
      quantity: quantity,
      image: product.images[0],
    };
    console.log('Added to Cart:', item);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    // In a real app, dispatch an action to update global cart state
  };

  const handleAddToWishlist = () => {
    // Simulate adding to wishlist
    console.log('Added to Wishlist:', product.name);
    toast.success(`${product.name} added to your wishlist!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description.substring(0, 100) + '...',
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">{error || 'Product data is missing.'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb/Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Column 1: Image Gallery */}
          <div className="lg:col-span-2 xl:col-span-1">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Column 2: Details and Description */}
          <div className="lg:col-span-2 xl:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>

              {/* Rating */}
              <div className="flex items-center mb-6 space-x-3">
                <RatingStars rating={product.rating} />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount} Reviews)</span>
                <button onClick={handleShare} className="ml-auto p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Variants/Options */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Configuration:</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                          selectedVariant?.id === variant.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Product Overview</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Technical Specifications</h3>
                <ul className="space-y-2 text-gray-600">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex justify-between border-b border-dashed pb-1 last:border-b-0">
                      <span className="font-medium text-gray-700">{spec.key}</span>
                      <span className="text-right">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Price and Actions (Sticky) */}
          <div className="xl:col-span-1">
            <ProductActions
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;