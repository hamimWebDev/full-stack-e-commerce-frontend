import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Save, Shield, CreditCard, ImagePlus, ImageIcon, Trash } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import { toast } from 'react-hot-toast';

const Account: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (profileData.phoneNumber && !/^\+?[0-9]{10,15}$/.test(profileData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.put('/users/profile', profileData);

      if (response.data.success) {
        updateUser(response.data.user);
        toast.success('Profile updated successfully');
        setIsEditing(false);
        setErrors({});
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const response = await api.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        updateUser(response.data.user);
        toast.success('Profile photo updated successfully');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile photo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      setIsLoading(true);
      const response = await api.put('/users/profile', { profilePhoto: '' });

      if (response.data.success) {
        updateUser(response.data.user);
        toast.success('Profile photo removed successfully');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove profile photo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 relative group">
                      <img
                        src={user?.profilePhoto || './public/Default-profile-photo.jpeg'}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col items-center">
                          <label className="cursor-pointer bg-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              disabled={isLoading}
                            />
                            {user?.profilePhoto ? (
                              <>
                                <ImageIcon size={16} />
                                
                              </>
                            ) : (
                              <>
                                <ImagePlus size={16} />
                                
                              </>
                            )}
                          </label>
                          {user?.profilePhoto && (
                            <button
                              className="mt-2 text-white text-sm hover:text-red-200 transition-colors"
                              onClick={handleRemoveImage}
                              disabled={isLoading}
                            >
                              <Trash size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <h2 className="text-[15px] font-semibold">{user?.name}</h2>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                </div>

                <div className="p-3">
                  <nav className="space-y-1">
                    <button
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'profile'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User size={18} className="mr-3" />
                      Profile Information
                    </button>

                    <button
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'addresses'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      onClick={() => setActiveTab('addresses')}
                    >
                      <MapPin size={18} className="mr-3" />
                      Addresses
                    </button>

                    <button
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'payment'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      onClick={() => setActiveTab('payment')}
                    >
                      <CreditCard size={18} className="mr-3" />
                      Payment Methods
                    </button>

                    <button
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'security'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      onClick={() => setActiveTab('security')}
                    >
                      <Shield size={18} className="mr-3" />
                      Security
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Profile Information */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Profile Information</h2>
                      {!isEditing ? (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Edit size={16} />}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          icon={<Save size={16} />}
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                      )}
                    </div>

                    <div className="p-6">
                      {isEditing ? (
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.name ? 'border-red-500' : 'border-neutral-300'
                              }`}
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.email ? 'border-red-500' : 'border-neutral-300'
                              }`}
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phoneNumber"
                              value={profileData.phoneNumber}
                              onChange={handleProfileChange}
                              placeholder='+8801717171717'
                              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.phoneNumber ? 'border-red-500' : 'border-neutral-300'
                              }`}
                            />
                            {errors.phoneNumber && (
                              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={profileData.address}
                              onChange={handleProfileChange}
                              placeholder='Dhaka, Bangladesh'
                              className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>

                          <div className="flex justify-end space-x-3">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsEditing(false);
                                setErrors({});
                                // Reset form data to current user data
                                if (user) {
                                  setProfileData({
                                    name: user.name || '',
                                    email: user.email || '',
                                    phoneNumber: user.phoneNumber || '',
                                    address: user.address || '',
                                  });
                                }
                              }}
                              disabled={isLoading}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveProfile}
                              disabled={isLoading}
                            >
                              {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <User size={20} className="text-neutral-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-neutral-500">Full Name</p>
                              <p className="font-medium">{profileData.name}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Mail size={20} className="text-neutral-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-neutral-500">Email Address</p>
                              <p className="font-medium">{profileData.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Phone size={20} className="text-neutral-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-neutral-500">Phone Number</p>
                              <p className="font-medium">{profileData.phoneNumber || 'Not provided'}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <MapPin size={20} className="text-neutral-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-neutral-500">Address</p>
                              <p className="font-medium">{profileData.address || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Addresses */}
                {activeTab === 'addresses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Your Addresses</h2>
                      <Button variant="outline" size="sm" icon={<Edit size={16} />}>
                        Add New
                      </Button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Home</span>
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">Default</span>
                          </div>
                          <p className="text-sm">John Doe</p>
                          <p className="text-sm">123 Main St.</p>
                          <p className="text-sm">Anytown, CA 12345</p>
                          <p className="text-sm">United States</p>

                          <div className="mt-4 flex space-x-2">
                            <button className="text-sm text-primary-600 hover:text-primary-800">
                              Edit
                            </button>
                            <button className="text-sm text-neutral-600 hover:text-neutral-800">
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="border border-neutral-200 rounded-lg p-4">
                          <div className="font-medium mb-2">Work</div>
                          <p className="text-sm">John Doe</p>
                          <p className="text-sm">456 Corporate Ave.</p>
                          <p className="text-sm">Business City, CA 67890</p>
                          <p className="text-sm">United States</p>

                          <div className="mt-4 flex space-x-2">
                            <button className="text-sm text-primary-600 hover:text-primary-800">
                              Edit
                            </button>
                            <button className="text-sm text-primary-600 hover:text-primary-800">
                              Set as Default
                            </button>
                            <button className="text-sm text-neutral-600 hover:text-neutral-800">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Payment Methods */}
                {activeTab === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Payment Methods</h2>
                      <Button variant="outline" size="sm" icon={<CreditCard size={16} />}>
                        Add New
                      </Button>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6">
                        <div className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="bg-neutral-200 w-10 h-6 rounded mr-2 flex items-center justify-center">
                                <span className="text-xs font-semibold">VISA</span>
                              </div>
                              <span className="font-medium">•••• •••• •••• 4242</span>
                            </div>
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">Default</span>
                          </div>
                          <p className="text-sm">Expires 12/2025</p>

                          <div className="mt-4 flex space-x-2">
                            <button className="text-sm text-primary-600 hover:text-primary-800">
                              Edit
                            </button>
                            <button className="text-sm text-neutral-600 hover:text-neutral-800">
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="bg-neutral-200 w-10 h-6 rounded mr-2 flex items-center justify-center">
                              <span className="text-xs font-semibold">MC</span>
                            </div>
                            <span className="font-medium">•••• •••• •••• 5678</span>
                          </div>
                          <p className="text-sm">Expires 08/2024</p>

                          <div className="mt-4 flex space-x-2">
                            <button className="text-sm text-primary-600 hover:text-primary-800">
                              Edit
                            </button>
                            <button className="text-sm text-primary-600 hover:text-primary-800">
                              Set as Default
                            </button>
                            <button className="text-sm text-neutral-600 hover:text-neutral-800">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Security */}
                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-neutral-200">
                      <h2 className="text-xl font-semibold">Security</h2>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-4">Change Password</h3>
                          <div className="space-y-4 max-w-lg">
                            <div>
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                                Current Password
                              </label>
                              <input
                                type="password"
                                id="currentPassword"
                                className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                                New Password
                              </label>
                              <input
                                type="password"
                                id="newPassword"
                                className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                            </div>

                            <Button>Update Password</Button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-neutral-200">
                          <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                          <p className="text-sm text-neutral-600 mb-4 max-w-lg">
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </p>
                          <Button variant="outline">Enable 2FA</Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;