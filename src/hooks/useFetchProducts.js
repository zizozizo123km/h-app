import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook for fetching product data from a specified API endpoint.
 * Handles loading states, error handling, and provides a refetch mechanism.
 *
 * @param {string} apiUrl - The URL of the product API endpoint.
 * @returns {{
 *   products: Array<Object>,
 *   loading: boolean,
 *   error: string | null,
 *   refetch: () => Promise<void>
 * }}
 */
const useFetchProducts = (apiUrl) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Core function to execute the API call. Memoized using useCallback.
   */
  const fetchProducts = useCallback(async () => {
    if (!apiUrl) {
      setError("API URL is required.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        // Throw an error for 4xx or 5xx status codes
        const errorBody = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorBody.substring(0, 100)}...`);
      }

      const data = await response.json();

      // Assuming the API returns an array of products directly
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        // Handle common API structure where data is nested (e.g., { products: [...] })
        setProducts(data.products);
      } else {
        // Handle unexpected data format
        console.warn("Fetched data is not a standard array format.", data);
        setProducts(data || []);
      }

    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "An unknown network error occurred.");
      setProducts([]); // Clear products on failure
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Effect runs on mount and whenever the apiUrl changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

export default useFetchProducts;