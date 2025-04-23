import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg text-primary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="text-center p-6 bg-neutral-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-neutral-600">Mon-Fri from 8am to 5pm</p>
              <a href="tel:+1-800-123-4567" className="text-primary-600 hover:text-primary-700">
                +1 (800) 123-4567
              </a>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-neutral-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-neutral-600">24/7 Support</p>
              <a href="mailto:support@nh-tech.com" className="text-primary-600 hover:text-primary-700">
                support@nh-tech.com
              </a>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-neutral-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Office</h3>
              <p className="text-neutral-600">123 Fifth Avenue</p>
              <p className="text-neutral-600">New York, NY 10160</p>
            </motion.div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <MessageSquare size={24} className="text-primary-600 mr-3" />
                  <h2 className="text-2xl font-semibold">Send us a Message</h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Product Support</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <Button 
                      type="submit"
                      loading={isSubmitting}
                      icon={<Send size={18} />}
                      iconPosition="right"
                    >
                      Send Message
                    </Button>
                    
                    {submitSuccess && (
                      <motion.p 
                        className="ml-4 text-success-600"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        Message sent successfully!
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1838367509546!2d-73.99016378459418!3d40.75889097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1645554182227!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;