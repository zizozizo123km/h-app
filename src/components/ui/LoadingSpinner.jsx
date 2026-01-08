import React from 'react';

/**
 * A highly customizable, production-ready loading spinner component.
 * Utilizes Tailwind CSS for animation and styling.
 *
 * @param {('sm'|'md'|'lg'|'xl')} [size='md'] - Defines the size of the spinner.
 * @param {('primary'|'white'|'dark'|'accent')} [color='primary'] - Defines the color scheme.
 * @param {string} [className=''] - Additional classes to apply to the spinner container.
 */
const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  // Define size mappings: [height, width, border thickness]
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-8',
  };

  // Define color mappings: [main border color, transparent border color]
  // Note: border-t-transparent creates the visual gap for the spinning effect.
  const colorClasses = {
    primary: 'border-indigo-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    dark: 'border-gray-800 border-t-transparent',
    accent: 'border-red-500 border-t-transparent',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedColor = colorClasses[color] || colorClasses.primary;

  return (
    <div
      className={`
        animate-spin rounded-full 
        ${selectedSize} 
        ${selectedColor} 
        ${className}
      `}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* Visually hidden text for accessibility, though role="status" often suffices */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;