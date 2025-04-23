import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp, ArrowDown, Calendar, DollarSign, ShoppingCart, Users } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import Button from '../../components/ui/Button';
import { orders } from '../../data/orders';

// Mock data for charts
const salesData = [
  { month: 'Jan', value: 1200 },
  { month: 'Feb', value: 1900 },
  { month: 'Mar', value: 1500 },
  { month: 'Apr', value: 2100 },
  { month: 'May', value: 1800 },
  { month: 'Jun', value: 2400 },
  { month: 'Jul', value: 2200 },
  { month: 'Aug', value: 2600 },
  { month: 'Sep', value: 2900 },
  { month: 'Oct', value: 3100 },
  { month: 'Nov', value: 3400 },
  { month: 'Dec', value: 3800 },
];

const visitorsData = [
  { month: 'Jan', value: 5200 },
  { month: 'Feb', value: 5900 },
  { month: 'Mar', value: 6500 },
  { month: 'Apr', value: 6100 },
  { month: 'May', value: 7800 },
  { month: 'Jun', value: 8400 },
  { month: 'Jul', value: 8200 },
  { month: 'Aug', value: 7600 },
  { month: 'Sep', value: 8900 },
  { month: 'Oct', value: 9100 },
  { month: 'Nov', value: 9400 },
  { month: 'Dec', value: 10800 },
];

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Accessories', value: 30 },
  { name: 'Furniture', value: 25 },
];

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  // Calculate total revenue
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  
  // Calculate average order value
  const averageOrderValue = totalRevenue / orders.length;
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-neutral-600">View insights about your store's performance</p>
        </div>
        
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <Button 
              variant={timeRange === 'week' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('week')}
              className="rounded-r-none"
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('month')}
              className="rounded-none"
            >
              Month
            </Button>
            <Button 
              variant={timeRange === 'year' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('year')}
              className="rounded-l-none"
            >
              Year
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-semibold mt-1">${totalRevenue.toFixed(2)}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-success-600 text-sm font-medium flex items-center">
                    <ArrowUp size={14} className="mr-1" />
                    12.5%
                  </span>
                  <span className="ml-1 text-neutral-500 text-xs">vs last {timeRange}</span>
                </div>
              </div>
              <div className="bg-primary-100 rounded-full p-2 text-primary-600">
                <DollarSign size={20} />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500 text-sm">Total Orders</p>
                <h3 className="text-2xl font-semibold mt-1">{orders.length}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-success-600 text-sm font-medium flex items-center">
                    <ArrowUp size={14} className="mr-1" />
                    8.2%
                  </span>
                  <span className="ml-1 text-neutral-500 text-xs">vs last {timeRange}</span>
                </div>
              </div>
              <div className="bg-accent-100 rounded-full p-2 text-accent-600">
                <ShoppingCart size={20} />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500 text-sm">Average Order Value</p>
                <h3 className="text-2xl font-semibold mt-1">${averageOrderValue.toFixed(2)}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-error-600 text-sm font-medium flex items-center">
                    <ArrowDown size={14} className="mr-1" />
                    3.1%
                  </span>
                  <span className="ml-1 text-neutral-500 text-xs">vs last {timeRange}</span>
                </div>
              </div>
              <div className="bg-secondary-100 rounded-full p-2 text-secondary-600">
                <TrendingUp size={20} />
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Sales Overview</h2>
            </div>
            <div className="p-6">
              <div className="h-72">
                {/* In a real app, this would be a chart component */}
                <div className="h-full flex items-end">
                  <div className="w-full flex items-end space-x-4">
                    {salesData.map((item, index) => (
                      <div key={item.month} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-primary-500 rounded-t transition-all duration-1000 ease-out"
                          style={{ 
                            height: `${(item.value / 4000) * 100}%`,
                            animationDelay: `${index * 100}ms`,
                            animation: 'grow 1s ease-out forwards'
                          }}
                        ></div>
                        <span className="text-xs mt-2 text-neutral-500">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Website Traffic</h2>
            </div>
            <div className="p-6">
              <div className="h-72">
                {/* In a real app, this would be a chart component */}
                <div className="h-full flex items-end">
                  <div className="w-full flex items-end space-x-4">
                    {visitorsData.map((item, index) => (
                      <div key={item.month} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-accent-500 rounded-t transition-all duration-1000 ease-out"
                          style={{ 
                            height: `${(item.value / 12000) * 100}%`,
                            animationDelay: `${index * 100}ms`,
                            animation: 'grow 1s ease-out forwards'
                          }}
                        ></div>
                        <span className="text-xs mt-2 text-neutral-500">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white rounded-lg shadow-sm lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Recent Sales</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{order.user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-700">
                          {order.products.length > 1 
                            ? `${order.products[0].name} and ${order.products.length - 1} more` 
                            : order.products[0].name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Sales by Category</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {categoryData.map(category => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-neutral-500">{category.value}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${
                          category.name === 'Electronics' ? 'bg-primary-500' :
                          category.name === 'Accessories' ? 'bg-accent-500' :
                          'bg-secondary-500'
                        }`}
                        style={{ width: '0%' }}
                        animate={{ width: `${category.value}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;