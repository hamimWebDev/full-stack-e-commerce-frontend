import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-lg border border-neutral-200 overflow-hidden';
  const hoverStyles = hover ? 'transition-all duration-200 hover:shadow-md' : '';
  
  const cardProps = {
    className: `${baseStyles} ${hoverStyles} ${className}`,
    ...(onClick && { onClick, role: 'button', tabIndex: 0 }),
  };
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...cardProps}
      >
        {children}
      </motion.div>
    );
  }
  
  return <div {...cardProps}>{children}</div>;
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <p className={`text-sm text-neutral-500 ${className}`}>{children}</p>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export default Card;