import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Package, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/store/ProductGrid';
import Button from '../components/ui/Button';
import { products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:py-24 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                variants={itemVariants}
              >
                Elevate Your Lifestyle With Premium Products
              </motion.h1>
              
              <motion.p 
                className="text-lg text-neutral-700 mb-8 max-w-lg"
                variants={itemVariants}
              >
                Discover our curated collection of high-quality products designed to enhance your everyday life.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Link to="/shop">
                  <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                    Shop Now
                  </Button>
                </Link>
                
                <Link to="/new-arrivals">
                  <Button size="lg" variant="outline">
                    New Arrivals
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Premium headphones" 
                    className="rounded-lg shadow-lg object-cover h-48 w-full"
                  />
                  <img 
                    src="https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Smart watch" 
                    className="rounded-lg shadow-lg object-cover h-32 w-full"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img 
                    src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Wireless earbuds" 
                    className="rounded-lg shadow-lg object-cover h-32 w-full"
                  />
                  <img 
                    src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Premium camera" 
                    className="rounded-lg shadow-lg object-cover h-48 w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products" 
          description="Discover our handpicked selection of premium products that define quality and style."
        />
        
        <div className="text-center mt-8">
          <Link to="/shop">
            <Button variant="outline" icon={<ArrowRight size={18} />} iconPosition="right">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Features Highlight */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We're committed to providing an exceptional shopping experience with premium products and outstanding service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-neutral-600">
                We curate only the highest quality products that meet our rigorous standards.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600 mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-neutral-600">
                Quick delivery to your doorstep with careful packaging and handling.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Package size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-neutral-600">
                Hassle-free 30-day return policy for all products, no questions asked.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success-100 text-success-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-neutral-600">
                Multiple secure payment options protecting your financial information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded-md bg-primary-800 border border-primary-700 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <Button variant="accent">Subscribe</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Home;