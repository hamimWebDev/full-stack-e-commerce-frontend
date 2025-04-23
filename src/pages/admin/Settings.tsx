import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Store, Globe, CreditCard, Bell, Shield, Mail } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('general');
  
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'NH-Tech',
    storeEmail: 'support@nh-tech.com',
    storePhone: '+1 (800) 123-4567',
    storeAddress: '123 Fifth Avenue, New York, NY 10160',
    storeCurrency: 'USD',
    storeLanguage: 'English',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStock: true,
    newReviews: true,
    marketingEmails: false,
  });
  
  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save the settings to a database
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-neutral-600">Manage your store settings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-neutral-200">
            <nav className="flex flex-wrap -mb-px">
              <button
                className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'general'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('general')}
              >
                <Store size={16} className="inline-block mr-2" />
                General
              </button>
              <button
                className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'regional'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('regional')}
              >
                <Globe size={16} className="inline-block mr-2" />
                Regional
              </button>
              <button
                className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'payment'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard size={16} className="inline-block mr-2" />
                Payment
              </button>
              <button
                className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'notifications'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={16} className="inline-block mr-2" />
                Notifications
              </button>
              <button
                className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'security'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={16} className="inline-block mr-2" />
                Security
              </button>
            </nav>
          </div>
          
          <div className="p-4 sm:p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">General Settings</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={storeSettings.storeName}
                      onChange={handleStoreSettingsChange}
                      className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="storeEmail" className="block text-sm font-medium text-neutral-700 mb-1">
                      Store Email
                    </label>
                    <input
                      type="email"
                      id="storeEmail"
                      name="storeEmail"
                      value={storeSettings.storeEmail}
                      onChange={handleStoreSettingsChange}
                      className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="storePhone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Store Phone
                    </label>
                    <input
                      type="tel"
                      id="storePhone"
                      name="storePhone"
                      value={storeSettings.storePhone}
                      onChange={handleStoreSettingsChange}
                      className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="storeAddress" className="block text-sm font-medium text-neutral-700 mb-1">
                      Store Address
                    </label>
                    <input
                      type="text"
                      id="storeAddress"
                      name="storeAddress"
                      value={storeSettings.storeAddress}
                      onChange={handleStoreSettingsChange}
                      className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Regional Settings */}
            {activeTab === 'regional' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Regional Settings</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="storeCurrency" className="block text-sm font-medium text-neutral-700 mb-1">
                      Currency
                    </label>
                    <select
                      id="storeCurrency"
                      name="storeCurrency"
                      value={storeSettings.storeCurrency}
                      onChange={handleStoreSettingsChange}
                      className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="storeLanguage" className="block text-sm font-medium text-neutral-700 mb-1">
                      Language
                    </label>
                    <select
                      id="storeLanguage"
                      name="storeLanguage"
                      value={storeSettings.storeLanguage}
                      onChange={handleStoreSettingsChange}
                      className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Notification Settings</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="orderConfirmation" className="block text-sm font-medium text-neutral-700">
                        Order Confirmation
                      </label>
                      <p className="text-sm text-neutral-500">Receive notifications when orders are placed</p>
                    </div>
                    <input
                      type="checkbox"
                      id="orderConfirmation"
                      name="orderConfirmation"
                      checked={notificationSettings.orderConfirmation}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="orderShipped" className="block text-sm font-medium text-neutral-700">
                        Order Shipped
                      </label>
                      <p className="text-sm text-neutral-500">Receive notifications when orders are shipped</p>
                    </div>
                    <input
                      type="checkbox"
                      id="orderShipped"
                      name="orderShipped"
                      checked={notificationSettings.orderShipped}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="orderDelivered" className="block text-sm font-medium text-neutral-700">
                        Order Delivered
                      </label>
                      <p className="text-sm text-neutral-500">Receive notifications when orders are delivered</p>
                    </div>
                    <input
                      type="checkbox"
                      id="orderDelivered"
                      name="orderDelivered"
                      checked={notificationSettings.orderDelivered}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="lowStock" className="block text-sm font-medium text-neutral-700">
                        Low Stock Alerts
                      </label>
                      <p className="text-sm text-neutral-500">Receive notifications when products are low in stock</p>
                    </div>
                    <input
                      type="checkbox"
                      id="lowStock"
                      name="lowStock"
                      checked={notificationSettings.lowStock}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="newReviews" className="block text-sm font-medium text-neutral-700">
                        New Reviews
                      </label>
                      <p className="text-sm text-neutral-500">Receive notifications when new reviews are posted</p>
                    </div>
                    <input
                      type="checkbox"
                      id="newReviews"
                      name="newReviews"
                      checked={notificationSettings.newReviews}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="marketingEmails" className="block text-sm font-medium text-neutral-700">
                        Marketing Emails
                      </label>
                      <p className="text-sm text-neutral-500">Receive marketing and promotional emails</p>
                    </div>
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      name="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button icon={<Save size={18} />} onClick={handleSaveSettings}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;