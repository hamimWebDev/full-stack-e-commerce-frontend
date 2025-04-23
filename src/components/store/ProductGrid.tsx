import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title, description }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && <p className="text-neutral-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;