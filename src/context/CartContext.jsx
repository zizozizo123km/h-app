import React, { createContext, useReducer, useContext, useEffect, useMemo } from 'react';

// --- Constants and Initial State ---
const CART_STORAGE_KEY = 'shoppingCart';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// --- Helper Functions ---

/**
 * Calculates the total number of items and the total price based on the current cart items array.
 * @param {Array} items - The array of cart items.
 * @returns {{totalItems: number, totalPrice: number}}
 */
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice: parseFloat(totalPrice.toFixed(2)) };
};

/**
 * Initializer function for useReducer to load state from localStorage.
 * @param {Object} defaultState - The default initial state.
 * @returns {Object} The loaded state or the default state.
 */
const initializer = (defaultState) => {
  try {
    const storedState = localStorage.getItem(CART_STORAGE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // Ensure totals are recalculated upon load in case of data corruption or schema changes
      return {
        ...parsedState,
        ...calculateTotals(parsedState.items || []),
      };
    }
    return defaultState;
  } catch (error) {
    console.error("Error loading cart state from storage:", error);
    return defaultState;
  }
};

// --- Reducer Logic ---

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantity || 1;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);

      let updatedItems;

      if (existingItemIndex > -1) {
        // Item exists: Update quantity
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        // New item: Add to cart
        updatedItems = [...state.items, { ...newItem, quantity: quantityToAdd }];
      }

      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      };
    }

    case 'REMOVE_ITEM': {
      const itemId = action.payload;
      const updatedItems = state.items.filter(item => item.id !== itemId);

      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is zero or less, remove the item entirely
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const updatedItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: quantity }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// --- Context Creation ---

const CartContext = createContext(initialState);

// --- Provider Component ---

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializer);

  // Effect for persistence (saving state to localStorage)
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Could not save cart state to storage:", error);
    }
  }, [state]);

  // Action Dispatchers (API exposed to consumers)
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    // Selector: Check if cart is empty
    isEmpty: state.items.length === 0,
  }), [state]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// --- Custom Hook ---

/**
 * Custom hook to consume the cart context.
 * Provides access to cart state (items, totals) and actions (addItem, removeItem, etc.).
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export the context itself for advanced usage (optional)
export default CartContext;