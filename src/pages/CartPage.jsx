import React, { useState, useMemo, useCallback } from 'react';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';

// --- Mock Data ---
const MOCK_CART_ITEMS = [
  { id: 101, name: 'Premium Noise-Cancelling Headphones', price: 249.99, quantity: 1, image: 'https://via.placeholder.com/150/4f46e5/ffffff?text=Headphones', stock: 5 },
  { id: 102, name: 'Ergonomic Mechanical Keyboard (TKL)', price: 129.00, quantity: 2, image: 'https://via.placeholder.com/150/10b981/ffffff?text=Keyboard', stock: 10 },
  { id: 103, name: '4K Ultra HD Monitor (27")', price: 499.50, quantity: 1, image: 'https://via.placeholder.com/150/f97316/ffffff?text=Monitor', stock: 3 },
];

// --- Utility Functions ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// --- CartItem Component ---
const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  const { id, name, price, quantity, image, stock } = item;
  const itemSubtotal = price * quantity;

  const handleQuantityChange = (newQuantity) => {
    const parsedQuantity = parseInt(newQuantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      onUpdateQuantity(id, 1);
    } else if (parsedQuantity > stock) {
      onUpdateQuantity(id, stock);
    } else {
      onUpdateQuantity(id, parsedQuantity);
    }
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200 hover:bg-gray-50 transition duration-150">
      {/* Product Image and Details */}
      <div className="flex-shrink-0 w-20 h-20 mr-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">Price: {formatCurrency(price)}</p>
        {stock < 5 && (
          <p className="text-xs text-red-500 font-medium mt-1">
            Only {stock} left in stock!
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center mx-4 w-28">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="p-1 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
          aria-label={`Decrease quantity of ${name}`}
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="w-10 text-center border-t border-b border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          aria-label={`Quantity of ${name}`}
        />
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= stock}
          className="p-1 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
          aria-label={`Increase quantity of ${name}`}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Subtotal */}
      <div className="w-24 text-right hidden sm:block">
        <p className="text-lg font-medium text-gray-900">
          {formatCurrency(itemSubtotal)}
        </p>
      </div>

      {/* Remove Button */}
      <div className="ml-4">
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
          aria-label={`Remove ${name} from cart`}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
});

// --- OrderSummary Component ---
const OrderSummary = React.memo(({ subtotal, totalItems }) => {
  const SHIPPING_RATE = subtotal > 500 ? 0 : 25.00;
  const TAX_RATE = 0.08; // 8% tax

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_RATE + tax;

  return (
    <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
        Order Summary
      </h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Estimate</span>
          <span className={`font-medium ${SHIPPING_RATE === 0 ? 'text-green-600' : ''}`}>
            {SHIPPING_RATE === 0 ? 'Free' : formatCurrency(SHIPPING_RATE)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax Estimate (8%)</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">Order Total</span>
        <span className="text-2xl font-extrabold text-indigo-600">
          {formatCurrency(total)}
        </span>
      </div>

      <button
        className="mt-8 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => alert('Proceeding to Checkout!')}
      >
        Proceed to Checkout
      </button>

      <p className="mt-4 text-center text-sm text-gray-500">
        Shipping calculated at checkout.
      </p>
    </div>
  );
});

// --- Main CartPage Component ---
const CartPage = () => {
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);

  // Calculate totals using useMemo for performance
  const { subtotal, totalItems } = useMemo(() => {
    const calculatedSubtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const calculatedTotalItems = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return { subtotal: calculatedSubtotal, totalItems: calculatedTotalItems };
  }, [cartItems]);

  // Handler to update item quantity
  const handleUpdateQuantity = useCallback((id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  // Handler to remove item
  const handleRemoveItem = useCallback((id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 sm:p-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <ShoppingCart className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          Shopping Cart
        </h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Cart Items List (Column 1 & 2) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary (Column 3) */}
          <div className="lg:col-span-1 mt-10 lg:mt-0">
            <OrderSummary subtotal={subtotal} totalItems={totalItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;