import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// --- Constants and Utility Functions ---

const AUTH_TOKEN_KEY = 'ecom_auth_token';
const AUTH_USER_KEY = 'ecom_auth_user';

// Utility to simulate API calls
const simulateApiCall = (data, delay = 800, success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(new Error(data.message || 'Authentication failed.'));
      }
    }, delay);
  });
};

// --- Context Definition ---

const AuthContext = createContext(null);

// --- Auth Provider Component ---

/**
 * AuthProvider manages the global authentication state, token persistence,
 * and provides methods for login, logout, and registration.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Initialization and Token Check
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Handle corrupted storage data
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // 2. Authentication Actions

  const handleAuthSuccess = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    setError(null);
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // --- Replace with actual API call (e.g., axios.post('/api/login')) ---
      const response = await simulateApiCall({
        token: `mock_jwt_${Date.now()}`,
        user: { id: 1, email: credentials.email, name: 'John Doe', role: 'customer' },
      });
      // ---------------------------------------------------------------------

      handleAuthSuccess(response.token, response.user);
      return response.user;
    } catch (err) {
      setError(err.message || 'Login failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      // --- Replace with actual API call (e.g., axios.post('/api/register')) ---
      const response = await simulateApiCall({
        token: `mock_jwt_reg_${Date.now()}`,
        user: { id: 2, email: userData.email, name: userData.name, role: 'customer' },
      }, 1200);
      // ---------------------------------------------------------------------

      handleAuthSuccess(response.token, response.user);
      return response.user;
    } catch (err) {
      setError(err.message || 'Registration failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    // Simulate API call to invalidate token if necessary
    // await simulateApiCall({}, 100);

    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setError(null);
    setIsLoading(false);
  };

  // 3. Context Value Memoization
  const contextValue = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    error,
    login,
    logout,
    register,
  }), [user, token, isLoading, error]);

  // Show a loading spinner or null while checking initial auth status
  if (isLoading && token === null) {
    // In a real app, you might return a full-screen loading component here
    // return <div>Loading Authentication...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Custom Hook ---

/**
 * useAuth is the primary hook for consuming authentication state and actions.
 * Ensures the hook is used within an AuthProvider.
 * @returns {object} Authentication state and methods.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Exporting both the hook and the provider for application setup
// export { useAuth, AuthProvider }; // Already exported above, keeping clean structure.