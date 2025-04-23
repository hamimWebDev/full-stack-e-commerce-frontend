import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, Truck } from 'lucide-react';
import Layout from '../components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Crafting Premium Shopping Experiences
            </motion.h1>
            <motion.p 
              className="text-lg text-primary-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Since 2020, we've been dedicated to bringing you the finest selection of premium products 
              while providing an exceptional shopping experience.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">50K+</p>
              <p className="text-neutral-600">Happy Customers</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">1000+</p>
              <p className="text-neutral-600">Products</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">98%</p>
              <p className="text-neutral-600">Satisfaction Rate</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">24/7</p>
              <p className="text-neutral-600">Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-neutral-600">
              These principles guide everything we do and help us deliver the best possible experience to our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer First</h3>
              <p className="text-neutral-600">
                Our customers are at the heart of everything we do. We strive to exceed their expectations.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-neutral-600">
                We never compromise on quality. Every product meets our high standards.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success-100 text-success-600 mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-neutral-600">
                We're committed to sustainable practices and reducing our environmental impact.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reliability</h3>
              <p className="text-neutral-600">
                Fast, secure shipping and hassle-free returns you can count on.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-neutral-600">
              The passionate people behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 relative">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Sarah Johnson" 
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-neutral-600 mb-2">CEO & Founder</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4">
                <img 
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Michael Chen" 
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-neutral-600 mb-2">Head of Product</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4">
                <img 
                  src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Emily Martinez" 
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Emily Martinez</h3>
              <p className="text-neutral-600 mb-2">Customer Success</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;