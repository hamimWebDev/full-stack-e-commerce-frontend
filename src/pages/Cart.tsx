import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, CreditCard, Shield } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/store/CartItem';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, total, clearCart, itemCount } = useCart();
  
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const grandTotal = total + shipping + tax;
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
              <ShoppingCart size={32} className="text-neutral-500" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            
            <Link to="/shop">
              <Button icon={<ArrowRight size={18} />} iconPosition="right">
                Start Shopping
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
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Items ({itemCount})</h2>
                <button 
                  className="text-neutral-500 text-sm hover:text-error-600 transition-colors"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-neutral-200">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/shop">
                  <Button variant="outline" size="sm" icon={<ArrowRight size={16} />} iconPosition="right">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div>
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success-600">Free</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-neutral-200 my-3"></div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button fullWidth size="lg" className="mb-4">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="text-sm text-neutral-600">
                <div className="flex items-center mb-3">
                  <Shield size={16} className="text-primary-500 mr-2" />
                  <span>Secure checkout</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <CreditCard size={16} className="text-primary-500 mr-2" />
                  <span>We accept: Visa, Mastercard, American Express</span>
                </div>
                
                <p className="text-xs text-neutral-500 mt-4">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;