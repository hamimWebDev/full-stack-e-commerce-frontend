import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

// Mock wishlist data
const wishlistItems = [
  products[0],
  products[2],
  products[4],
];

const WishList: React.FC = () => {
  const { addItem } = useCart();
  
  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem(product, 1);
    }
  };
  
  const handleRemoveFromWishlist = (productId: string) => {
    // In a real app, this would remove the item from the wishlist
    console.log('Remove from wishlist:', productId);
  };
  
  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
              <Heart size={32} className="text-neutral-500" />
            </div>
            
            <h1 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h1>
            <p className="text-neutral-600 mb-8">Browse our products and add your favorites to your wishlist!</p>
            
            <Link to="/shop">
              <Button icon={<ArrowRight size={18} />} iconPosition="right">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <p className="text-neutral-600">
                You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            
            <ul className="divide-y divide-neutral-200">
              {wishlistItems.map((item, index) => (
                <motion.li 
                  key={item.id}
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-shrink-0 w-24 h-24 bg-neutral-100 rounded-md overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="flex-grow sm:ml-6 mt-4 sm:mt-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium text-neutral-900 hover:text-primary-600">
                            {item.name}
                          </Link>
                          
                          <div className="mt-1">
                            {item.discountPrice ? (
                              <div className="flex items-center">
                                <span className="font-medium text-neutral-800">${item.discountPrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-neutral-500 line-through">${item.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="font-medium text-neutral-800">${item.price.toFixed(2)}</span>
                            )}
                          </div>
                          
                          <div className="mt-1">
                            {item.stock > 0 ? (
                              <span className="text-sm text-success-600">In Stock</span>
                            ) : (
                              <span className="text-sm text-error-600">Out of Stock</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex mt-4 sm:mt-0 space-x-2">
                          <Button 
                            size="sm" 
                            icon={<ShoppingCart size={16} />}
                            onClick={() => handleAddToCart(item.id)}
                            disabled={item.stock === 0}
                          >
                            Add to Cart
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WishList;