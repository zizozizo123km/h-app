class ApiError extends Error {
    /**
     * Custom error class for API responses that are not OK (status >= 400).
     * @param {string} message - The error message.
     * @param {number} status - The HTTP status code.
     * @param {object | string | null} data - The response body data (if available).
     */
    constructor(message, status, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

// Configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Retrieves the authentication token from storage (e.g., localStorage).
 * In a real application, this might interact with a global state management system (Redux/Zustand).
 * @returns {string | null} The authentication token.
 */
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Core function to handle all API requests.
 * @param {string} endpoint - The API path (e.g., '/products').
 * @param {object} options - Request configuration.
 * @param {string} [options.method='GET'] - HTTP method.
 * @param {object | null} [options.body=null] - Request body data.
 * @param {object} [options.headers={}] - Custom headers.
 * @returns {Promise<object | null>} The parsed JSON response data.
 * @throws {ApiError} If the request fails or returns a non-2xx status.
 */
const request = async (endpoint, { method = 'GET', body = null, headers = {} } = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const token = getAuthToken();

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...headers,
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers: defaultHeaders,
    };

    // Attach body only if provided and method is not GET/HEAD
    if (body && method !== 'GET' && method !== 'HEAD') {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);

        // --- Error Handling (Non-2xx Status) ---
        if (!response.ok) {
            let errorData = null;
            try {
                // Attempt to parse JSON error body for detailed messages
                errorData = await response.json();
            } catch (e) {
                // If JSON parsing fails (e.g., server returns plain text or nothing)
                errorData = await response.text();
            }

            const errorMessage = errorData?.message || response.statusText || `API Request Failed with status ${response.status}`;

            throw new ApiError(errorMessage, response.status, errorData);
        }

        // --- Success Handling ---

        // 204 No Content (e.g., successful DELETE or PUT with no return data)
        if (response.status === 204) {
            return null;
        }

        // Return parsed JSON data
        return await response.json();

    } catch (error) {
        // Re-throw custom ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle true network errors (e.g., DNS failure, server unreachable)
        throw new ApiError(`Network Error: ${error.message}`, 0, error);
    }
};

/**
 * The primary API service object providing helper methods for common HTTP verbs
 * and specific e-commerce endpoints.
 */
const apiService = {
    // Generic HTTP methods
    get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
    post: (endpoint, body, headers) => request(endpoint, { method: 'POST', body, headers }),
    put: (endpoint, body, headers) => request(endpoint, { method: 'PUT', body, headers }),
    delete: (endpoint, headers) => request(endpoint, { method: 'DELETE', headers }),

    // --- E-commerce Specific Endpoints ---

    /**
     * Fetches a list of products, optionally filtered by query parameters.
     * @param {object} params - Query parameters (e.g., { category: 'electronics', limit: 10 }).
     */
    getProducts: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiService.get(`/products${query ? `?${query}` : ''}`);
    },

    /**
     * Fetches a single product by ID.
     */
    getProductById: (id) => apiService.get(`/products/${id}`),

    /**
     * Creates a new order.
     */
    createOrder: (orderData) => apiService.post('/orders', orderData),

    /**
     * Handles user authentication (login).
     */
    login: (credentials) => apiService.post('/auth/login', credentials),

    /**
     * Handles user registration.
     */
    register: (userData) => apiService.post('/auth/register', userData),

    /**
     * Fetches the user's current shopping cart.
     */
    getCart: () => apiService.get('/cart'),

    /**
     * Adds an item to the user's shopping cart.
     */
    addToCart: (itemData) => apiService.post('/cart/items', itemData),
};

export { apiService, ApiError };