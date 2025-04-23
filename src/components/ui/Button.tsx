import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends MotionProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-400',
    outline: 'border border-neutral-300 hover:bg-neutral-100 focus-visible:ring-neutral-400',
    ghost: 'hover:bg-neutral-100 focus-visible:ring-neutral-400',
    link: 'text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500 p-0 h-auto',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg',
  };
  
  const sizeClass = variant === 'link' ? '' : sizes[size];
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizeClass} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;