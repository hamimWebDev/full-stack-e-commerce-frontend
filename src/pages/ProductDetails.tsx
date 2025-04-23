import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Share, 
  Check, 
  Truck 
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ProductGrid from '../components/store/ProductGrid';
import ProductReviews from '../components/store/ProductReviews';
import Badge from '../components/ui/Badge';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </Layout>
    );
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                onClick={() => navigate('/')}
                className="text-neutral-500 hover:text-neutral-700"
              >
                Home
              </button>
            </li>
            <li className="text-neutral-500">/</li>
            <li>
              <button 
                onClick={() => navigate('/shop')}
                className="text-neutral-500 hover:text-neutral-700"
              >
                Shop
              </button>
            </li>
            <li className="text-neutral-500">/</li>
            <li>
              <button 
                onClick={() => navigate(`/shop/${product.category}`)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </button>
            </li>
            <li className="text-neutral-500">/</li>
            <li className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-neutral-100 rounded-lg overflow-hidden mb-4 relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {product.images.length > 1 && (
                <>
                  <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {product.discountPrice && (
                <Badge 
                  variant="error" 
                  className="absolute top-4 left-4"
                >
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index} 
                    className={`
                      rounded-md overflow-hidden border-2 
                      ${currentImageIndex === index ? 'border-primary-500' : 'border-transparent'}
                    `}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={`${
                        index < Math.floor(product.rating) 
                          ? 'text-accent-500 fill-current' 
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-neutral-600">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-neutral-900">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-neutral-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="error" className="ml-2">
                      Save {discountPercentage}%
                    </Badge>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-neutral-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-sm text-neutral-700 mb-2">
                  <div className="w-24">Category:</div>
                  <span className="capitalize">{product.category}</span>
                </div>
                
                <div className="flex items-center text-sm text-neutral-700 mb-2">
                  <div className="w-24">Availability:</div>
                  {product.stock > 0 ? (
                    <span className="text-success-600 flex items-center">
                      <Check size={16} className="mr-1" />
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-error-600">Out of Stock</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-neutral-700">
                  <div className="w-24">Shipping:</div>
                  <span className="flex items-center">
                    <Truck size={16} className="mr-1 text-primary-600" />
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="border border-neutral-300 rounded-md flex items-center mr-4">
                    <button 
                      className="px-3 py-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="px-3 py-2 text-center w-12">{quantity}</span>
                    
                    <button 
                      className="px-3 py-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="text-sm text-neutral-600">
                    {product.stock > 0 && (
                      <span>
                        {product.stock} {product.stock === 1 ? 'unit' : 'units'} available
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    fullWidth 
                    size="lg" 
                    icon={<ShoppingCart size={20} />} 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-grow md:flex-grow-0"
                    icon={<Heart size={20} />}
                  >
                    Wishlist
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-grow md:flex-grow-0"
                    icon={<Share size={20} />}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Product Reviews */}
        <ProductReviews productId={product.id} />
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid 
            products={relatedProducts} 
            title="You may also like"
            description="Products similar to this one that customers also loved"
          />
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;