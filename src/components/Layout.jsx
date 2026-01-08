import React from 'react';
import Header from './Header'; // Assuming Header component exists
import Footer from './Footer'; // Assuming Footer component exists

/**
 * Layout Component
 * Wraps the entire application content, providing consistent structure (Header, Main, Footer).
 * Uses Tailwind CSS for responsive design and sticky footer implementation.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to be displayed within the main area.
 */
const Layout = ({ children }) => {
  return (
    // Main container: Ensures minimum screen height and uses flex column layout
    // Added basic dark mode support for background and text
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      {/* flex-grow ensures this section takes up all available vertical space, pushing the footer down */}
      <main className="flex-grow w-full">
        {/* Standard container for centering content and applying horizontal padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Layout;