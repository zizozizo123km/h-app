import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Defines the structure for navigation items.
 * In a real application, this would likely be imported from a constants file.
 */
const defaultNavItems = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المنتجات', href: '/products' },
  { label: 'العروض', href: '/offers' },
  { label: 'تواصل معنا', href: '/contact' },
  { label: 'حسابي', href: '/account' },
];

/**
 * MobileMenu Component
 * A slide-in sidebar menu optimized for mobile viewports.
 *
 * @param {boolean} isOpen - Controls the visibility of the menu.
 * @param {function} onClose - Callback function to close the menu.
 * @param {Array<Object>} [navItems] - Array of navigation links.
 */
const MobileMenu = ({ isOpen, onClose, navItems = defaultNavItems }) => {

  // Effect to prevent body scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is restored when component unmounts or state changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // If the menu is not open, we still render the structure but hide it completely
  // This allows for smooth CSS transitions when the state changes.
  if (!isOpen && typeof window !== 'undefined' && window.innerWidth > 768) {
    return null; // Hide completely on desktop to prevent unnecessary rendering/A11y issues
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/60 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel (Slides in from the right) */}
      <div
        className={`
          fixed top-0 right-0 w-64 max-w-[80vw] h-full bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل الرئيسية"
      >
        {/* Menu Header and Close Button */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">المتجر</h2>
          <button
            onClick={onClose}
            aria-label="إغلاق القائمة"
            className="text-gray-500 hover:text-gray-900 p-1 rounded-full transition duration-150 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-gray-800 hover:text-white hover:bg-primary font-medium py-3 px-3 rounded-lg transition duration-150 text-right"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Optional: Footer/User Actions */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
            <a
                href="/login"
                onClick={onClose}
                className="w-full block text-center bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition"
            >
                تسجيل الدخول
            </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;