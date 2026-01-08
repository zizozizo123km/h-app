import React, { forwardRef } from 'react';
import clsx from 'clsx';

// --- Internal Components ---

const Spinner = ({ className }) => (
  <svg
    className={clsx("animate-spin h-5 w-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// --- Style Definitions ---

const baseStyles =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

const variantStyles = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-white shadow-md',
  secondary:
    'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 focus:ring-offset-white',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 focus:ring-offset-white shadow-none',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-white shadow-md',
};

const sizeStyles = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

/**
 * A highly reusable and accessible button component.
 * Supports variants, sizes, loading states, and forwardRef.
 */
export const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      type = 'button',
      isLoading = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      {
        // Add padding adjustment when loading to keep text centered
        'pl-4 pr-4': isLoading && size === 'md',
        'pl-3 pr-3': isLoading && size === 'sm',
        'pl-6 pr-6': isLoading && size === 'lg',
      },
      className
    );

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading && <Spinner className={size === 'sm' ? 'h-4 w-4 mr-2' : 'mr-3'} />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;