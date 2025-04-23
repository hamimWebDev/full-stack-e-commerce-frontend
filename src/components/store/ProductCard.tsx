import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Would implement wishlist functionality here
  };
  
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
  
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div 
        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="relative overflow-hidden h-64">
          {/* Product Image */}
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Sale Badge */}
          {product.discountPrice && (
            <Badge 
              variant="error" 
              className="absolute top-2 left-2"
            >
              {discountPercentage}% OFF
            </Badge>
          )}
          
          {/* Quick Action Buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white rounded-full text-neutral-800 shadow-md focus:outline-none"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white rounded-full text-neutral-800 shadow-md focus:outline-none"
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              <Heart size={20} />
            </motion.button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-neutral-800 mb-1 truncate">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {Array(5).fill(0).map((_, index) => (
                <svg 
                  key={index}
                  className={`w-4 h-4 ${index < Math.floor(product.rating) ? 'text-accent-500' : 'text-neutral-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="font-semibold text-neutral-800">${product.discountPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-semibold text-neutral-800">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {product.stock < 10 && product.stock > 0 && (
              <span className="text-xs text-warning-600">Only {product.stock} left</span>
            )}
            
            {product.stock === 0 && (
              <span className="text-xs text-error-600">Out of stock</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;