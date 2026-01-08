import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Layouts ---
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
// const AuthLayout = React.lazy(() => import('../layouts/AuthLayout')); // Optional separate layout for login/register

// --- Pages (Lazy Loaded for optimal performance) ---
const HomePage = React.lazy(() => import('../pages/HomePage'));

// Shop & Product Pages
const ShopPage = React.lazy(() => import('../pages/shop/ShopPage'));
const ProductDetailPage = React.lazy(() => import('../pages/shop/ProductDetailPage'));

// Transaction Pages
const CartPage = React.lazy(() => import('../pages/cart/CartPage'));
const CheckoutPage = React.lazy(() => import('../pages/checkout/CheckoutPage'));

// Authentication Pages
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/auth/RegisterPage'));

// Utility Pages
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

/**
 * AppRouter Component
 * Configures all application routes using React Router DOM v6.
 * Utilizes React.lazy and Suspense for code splitting and performance optimization.
 */
const AppRouter = () => {
  // Simple loading fallback component (can be replaced with a sophisticated spinner)
  const LoadingFallback = (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-xl font-semibold text-primary-600 animate-pulse">
        جاري التحميل...
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={LoadingFallback}>
        <Routes>

          {/* 
            Main Layout Routes 
            These routes use the MainLayout (Header, Footer, Navigation)
          */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            
            {/* Shop Routes */}
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />

            {/* Transaction Routes */}
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            
            {/* Example of a Protected Route (Placeholder for future implementation) */}
            {/* <Route element={<ProtectedRoute />}>
              <Route path="account" element={<AccountPage />} />
            </Route> */}
          </Route>

          {/* 
            Authentication Routes 
            These routes often use a minimal layout or no layout.
          */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 
            Catch-all Route (404 Not Found) 
          */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;