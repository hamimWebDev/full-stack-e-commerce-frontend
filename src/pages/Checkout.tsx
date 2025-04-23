import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const steps = ['Shipping', 'Payment', 'Review', 'Confirmation'];

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Shipping details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment details
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const grandTotal = total + shipping + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      // Process order
      setIsCompleted(true);
      clearCart();
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };
  
  if (items.length === 0 && !isCompleted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-neutral-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  if (isCompleted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-100 text-success-600 mb-6">
              <CheckCircle size={40} />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-neutral-600 mb-6">
              Your order has been placed successfully. We've sent a confirmation email to your inbox.
            </p>
            
            <div className="mb-8 p-4 bg-neutral-50 rounded-md">
              <p className="font-medium">Order Number: <span className="text-primary-600">ORD-{Math.floor(100000 + Math.random() * 900000)}</span></p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orders">
                <Button>View Your Orders</Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center relative flex-1">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    index < activeStep ? 'bg-primary-600 text-white' : 
                    index === activeStep ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' : 
                    'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {index < activeStep ? <CheckCircle size={16} /> : index + 1}
                </div>
                <span 
                  className={`mt-2 text-sm ${
                    index <= activeStep ? 'text-primary-600 font-medium' : 'text-neutral-500'
                  }`}
                >
                  {step}
                </span>
                
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute top-4 left-1/2 right-0 h-0.5 -z-10 ${
                      index < activeStep ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <motion.div 
            className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm"
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Shipping Form */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                      State/Province*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
                      ZIP/Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                      Country*
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Form */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard size={20} className="text-primary-600" />
                    <h3 className="font-medium">Credit Card</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-neutral-700 mb-1">
                        Expiry Date*
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 mb-1">
                        CVV*
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-neutral-50 p-4 rounded-md text-sm text-neutral-700">
                  <p>
                    <span className="font-medium">Secure Payment:</span> Your payment information is encrypted and secure. We do not store your full card details.
                  </p>
                </div>
              </div>
            )}
            
            {/* Order Review */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-2 flex items-center">
                      <span>Shipping Information</span>
                      <button onClick={() => setActiveStep(0)} className="ml-2 text-sm text-primary-600 hover:text-primary-700">
                        Edit
                      </button>
                    </h3>
                    <div className="bg-neutral-50 p-4 rounded-md text-sm">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.country}</p>
                      <p>{formData.email}</p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-2 flex items-center">
                      <span>Payment Information</span>
                      <button onClick={() => setActiveStep(1)} className="ml-2 text-sm text-primary-600 hover:text-primary-700">
                        Edit
                      </button>
                    </h3>
                    <div className="bg-neutral-50 p-4 rounded-md text-sm">
                      <p>
                        Credit Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                      <p>{formData.cardName}</p>
                      <p>Expires: {formData.expiry}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-2">Order Items</h3>
                    <div className="bg-neutral-50 p-4 rounded-md">
                      <ul className="divide-y divide-neutral-200">
                        {items.map(item => (
                          <li key={item.product.id} className="py-3 flex justify-between">
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{item.product.name}</p>
                                <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium text-sm">
                              ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              
              <Button 
                onClick={handleNext}
                icon={activeStep < steps.length - 1 ? <ChevronRight size={16} /> : undefined}
                iconPosition="right"
              >
                {activeStep < steps.length - 1 ? 'Continue' : 'Place Order'}
              </Button>
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
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
              
              <div className="text-sm text-neutral-600 mt-6">
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-success-500 rounded-full mr-2"></span>
                  Free shipping on orders over $50
                </p>
                <p className="flex items-center mt-1">
                  <span className="inline-block w-2 h-2 bg-success-500 rounded-full mr-2"></span>
                  Guaranteed delivery within 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;