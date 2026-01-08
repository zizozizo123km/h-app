import React, { useMemo } from 'react';

/**
 * @typedef {object} CartSummaryProps
 * @property {number} subtotal - The sum of all item prices.
 * @property {number} shipping - The calculated shipping cost.
 * @property {number} taxes - The calculated tax amount.
 * @property {number} total - The final total cost (subtotal + shipping + taxes).
 * @property {function} onCheckout - Handler function for the checkout button click.
 */

/**
 * Utility function to format currency consistently.
 * In a real application, currency and locale would be dynamic.
 * @param {number} amount
 * @returns {string}
 */
const formatCurrency = (amount) => {
  // Use 'en-US' and 'USD' as defaults for demonstration
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * CartSummary component displays the breakdown of costs before checkout.
 * @param {CartSummaryProps} props
 */
const CartSummary = ({
  subtotal = 0,
  shipping = 0,
  taxes = 0,
  total = 0,
  onCheckout = () => console.log('Proceeding to checkout...'),
}) => {

  const summaryItems = useMemo(() => [
    { label: 'Subtotal', value: subtotal, key: 'subtotal' },
    { label: 'Shipping Estimate', value: shipping, key: 'shipping', note: 'Standard delivery' },
    { label: 'Taxes', value: taxes, key: 'taxes', note: 'Calculated at checkout' },
  ], [subtotal, shipping, taxes]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-gray-100 sticky top-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {summaryItems.map((item) => (
          <div key={item.key} className="flex justify-between items-center text-lg">
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">{item.label}</span>
              {item.note && (
                <span className="text-sm text-gray-400 italic">{item.note}</span>
              )}
            </div>
            <span className={`font-semibold ${item.key === 'shipping' && shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
              {item.key === 'shipping' && shipping === 0 ? 'FREE' : formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-extrabold text-gray-900">Order Total</span>
          <span className="text-3xl font-extrabold text-indigo-600" aria-label={`Total amount: ${formatCurrency(total)}`}>
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-8">
        <button
          onClick={onCheckout}
          type="button"
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out transform hover:scale-[1.01]"
          aria-label="Proceed to Checkout"
        >
          Proceed to Checkout
        </button>
      </div>

      <p className="mt-4 text-sm text-center text-gray-500">
        Shipping and taxes will be finalized upon entering your address.
      </p>
    </div>
  );
};

export default React.memo(CartSummary);
// Example usage (for development/testing):
/*
<CartSummary
  subtotal={150.00}
  shipping={15.00}
  taxes={7.50}
  total={172.50}
/>
*/