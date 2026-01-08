import React, { useState, useMemo } from 'react';
import { CreditCard, Truck, MapPin, Mail, Phone, User, Lock, ShoppingCart } from 'lucide-react';

// --- Mock Data ---
const mockCartItems = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1, image: 'https://via.placeholder.com/60/4f46e5/ffffff?text=H' },
  { id: 2, name: 'Ergonomic Mechanical Keyboard', price: 129.99, quantity: 2, image: 'https://via.placeholder.com/60/10b981/ffffff?text=K' },
  { id: 3, name: '4K Ultra HD Monitor', price: 450.00, quantity: 1, image: 'https://via.placeholder.com/60/f59e0b/ffffff?text=M' },
];
const SHIPPING_COST = 15.00;
const TAX_RATE = 0.08; // 8%

// --- Helper Components ---

const InputField = ({ label, id, type = 'text', placeholder, icon: Icon, value, onChange, required = true }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border border-gray-300 py-2 ${Icon ? 'pl-10' : 'pl-3'} pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  </div>
);

const PaymentOption = ({ id, icon: Icon, title, description, selected, onChange }) => (
  <label
    htmlFor={id}
    className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
      selected ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
    }`}
  >
    <input
      type="radio"
      id={id}
      name="paymentMethod"
      value={id}
      checked={selected}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mr-4"
    />
    <div className="flex-shrink-0 mr-4">
      <Icon className={`w-6 h-6 ${selected ? 'text-indigo-600' : 'text-gray-500'}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </label>
);

// --- Main Component ---

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Calculations ---
  const { subtotal, tax, total } = useMemo(() => {
    const sub = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculatedTax = sub * TAX_RATE;
    const finalTotal = sub + SHIPPING_COST + calculatedTax;
    return {
      subtotal: sub,
      tax: calculatedTax,
      total: finalTotal,
    };
  }, []);

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Basic validation check (can be expanded)
    if (paymentMethod === 'credit_card' && (!cardDetails.cardNumber || !cardDetails.cvv)) {
        alert('Please complete payment details.');
        setIsProcessing(false);
        return;
    }

    // Simulate API call for order placement
    setTimeout(() => {
      console.log('Order Placed:', { shippingInfo, paymentMethod, total });
      alert(`Order for $${total.toFixed(2)} placed successfully!`);
      setIsProcessing(false);
      // Redirect to confirmation page in a real application
    }, 2500);
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">
          <Lock className="inline w-8 h-8 mr-3 text-indigo-600" /> Secure Checkout
        </h1>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
          
          {/* --- Column 1 & 2: Shipping and Payment (Main Content) --- */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Shipping Information */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6 pb-3 border-b">
                <Truck className="w-6 h-6 mr-3 text-indigo-600" /> 1. Shipping Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField 
                  label="Full Name" 
                  id="fullName" 
                  icon={User} 
                  placeholder="John Doe" 
                  value={shippingInfo.fullName} 
                  onChange={handleShippingChange} 
                />
                <InputField 
                  label="Email Address" 
                  id="email" 
                  type="email" 
                  icon={Mail} 
                  placeholder="you@example.com" 
                  value={shippingInfo.email} 
                  onChange={handleShippingChange} 
                />
              </div>

              <InputField 
                label="Street Address" 
                id="address" 
                icon={MapPin} 
                placeholder="123 Main St" 
                value={shippingInfo.address} 
                onChange={handleShippingChange} 
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <InputField 
                  label="City" 
                  id="city" 
                  placeholder="New York" 
                  value={shippingInfo.city} 
                  onChange={handleShippingChange} 
                />
                <InputField 
                  label="ZIP / Postal Code" 
                  id="zip" 
                  placeholder="10001" 
                  value={shippingInfo.zip} 
                  onChange={handleShippingChange} 
                />
                <InputField 
                  label="Phone Number" 
                  id="phone" 
                  type="tel" 
                  icon={Phone} 
                  placeholder="(555) 555-5555" 
                  value={shippingInfo.phone} 
                  onChange={handleShippingChange} 
                />
              </div>
            </section>

            {/* 2. Payment Method */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6 pb-3 border-b">
                <CreditCard className="w-6 h-6 mr-3 text-indigo-600" /> 2. Payment Method
              </h2>

              <div className="space-y-4">
                <PaymentOption
                  id="credit_card"
                  icon={CreditCard}
                  title="Credit or Debit Card"
                  description="Visa, Mastercard, Amex, Discover"
                  selected={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                />
                <PaymentOption
                  id="paypal"
                  icon={() => <img src="https://www.svgrepo.com/show/353818/paypal.svg" alt="PayPal" className="w-6 h-6" />}
                  title="PayPal"
                  description="Pay easily, fast, and securely."
                  selected={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
              </div>

              {/* Credit Card Details (Conditional) */}
              {paymentMethod === 'credit_card' && (
                <div className="mt-6 p-6 border rounded-xl bg-gray-50 transition-all duration-300">
                  <InputField 
                    label="Card Number" 
                    id="cardNumber" 
                    type="text" 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    value={cardDetails.cardNumber} 
                    onChange={handleCardChange} 
                    icon={CreditCard}
                  />
                  <InputField 
                    label="Name on Card" 
                    id="cardName" 
                    type="text" 
                    placeholder="J. Doe" 
                    value={cardDetails.cardName} 
                    onChange={handleCardChange} 
                    icon={User}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <InputField 
                      label="Expiry Date" 
                      id="expiryDate" 
                      placeholder="MM/YY" 
                      value={cardDetails.expiryDate} 
                      onChange={handleCardChange} 
                    />
                    <InputField 
                      label="CVV" 
                      id="cvv" 
                      type="password" 
                      placeholder="123" 
                      value={cardDetails.cvv} 
                      onChange={handleCardChange} 
                    />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* --- Column 3: Order Summary --- */}
          <div className="mt-10 lg:mt-0 lg:col-span-1">
            <div className="sticky top-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-indigo-600" /> Order Summary
              </h2>

              {/* Item List */}
              <ul className="space-y-4 border-b pb-4 mb-4">
                {mockCartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded mr-3 object-cover" />
                        <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              {/* Subtotals */}
              <div className="space-y-2 text-sm mb-6 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Estimate</span>
                  <span className="font-medium">{formatPrice(SHIPPING_COST)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
                <span>Order Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white transition duration-300 
                  ${isProcessing 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Place Order (${formatPrice(total)})`
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center">
                <Lock className="w-3 h-3 mr-1" /> All transactions are secure and encrypted.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;