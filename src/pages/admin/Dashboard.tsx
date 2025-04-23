import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, DollarSign, TrendingUp, ShoppingCart, Package } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import StatCard from '../../components/admin/StatCard';
import { useAuth } from '../../context/AuthContext';
import { orders } from '../../data/orders';
import { products } from '../../data/products';
import { users } from '../../data/users';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate total revenue
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  
  // Filter orders from the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentOrders = orders.filter(order => new Date(order.createdAt) >= thirtyDaysAgo);
  
  // Calculate month-over-month growth
  const previousMonthOrders = 12; // Mock data
  const currentMonthOrders = recentOrders.length;
  const orderGrowth = previousMonthOrders ? (currentMonthOrders - previousMonthOrders) / previousMonthOrders * 100 : 0;
  
  // Revenue growth
  const revenueGrowth = 8.5; // Mock data
  
  // Customer growth
  const customerGrowth = 12.3; // Mock data
  
  // Products out of stock
  const outOfStockProducts = products.filter(product => product.stock === 0).length;
  
  // Calculate order status distribution
  const orderStatusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-neutral-600">Welcome back, {user?.name}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value={`$${totalRevenue.toFixed(2)}`}
            change={{ value: revenueGrowth, trend: 'up' }}
            icon={<DollarSign size={20} className="text-white" />}
            color="bg-primary-600"
          />
          
          <StatCard 
            title="Orders" 
            value={orders.length.toString()}
            change={{ value: orderGrowth, trend: orderGrowth >= 0 ? 'up' : 'down' }}
            icon={<ShoppingCart size={20} className="text-white" />}
            color="bg-accent-500"
          />
          
          <StatCard 
            title="Customers" 
            value={users.filter(u => u.role === 'customer').length.toString()}
            change={{ value: customerGrowth, trend: 'up' }}
            icon={<Users size={20} className="text-white" />}
            color="bg-secondary-600"
          />
          
          <StatCard 
            title="Products" 
            value={products.length.toString()}
            icon={<ShoppingBag size={20} className="text-white" />}
            color="bg-error-600"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Recent Sales */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-4 sm:p-6 border-b border-neutral-200">
              <h2 className="text-lg sm:text-xl font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        {order.id}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {order.user.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'delivered' ? 'bg-success-100 text-success-800' : 
                          order.status === 'shipped' ? 'bg-accent-100 text-accent-800' : 
                          order.status === 'processing' ? 'bg-primary-100 text-primary-800' : 
                          order.status === 'cancelled' ? 'bg-error-100 text-error-800' : 
                          'bg-warning-100 text-warning-800'}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Stats Overview */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="p-4 sm:p-6 border-b border-neutral-200">
              <h2 className="text-lg sm:text-xl font-semibold">Overview</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">Order Status</span>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(orderStatusCounts).map(([status, count]) => (
                      <div key={status} className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 
                          ${status === 'delivered' ? 'bg-success-500' : 
                          status === 'shipped' ? 'bg-accent-500' : 
                          status === 'processing' ? 'bg-primary-500' : 
                          status === 'cancelled' ? 'bg-error-500' : 
                          'bg-warning-500'}`}
                        />
                        <span className="text-sm capitalize">{status}</span>
                        <span className="ml-auto text-sm font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">Inventory Status</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 mb-2 mx-auto">
                        <ShoppingBag size={20} />
                      </div>
                      <p className="text-center text-xl font-semibold">{products.length}</p>
                      <p className="text-center text-sm text-neutral-600">Total Products</p>
                    </div>
                    <div className="bg-warning-50 p-4 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warning-100 text-warning-600 mb-2 mx-auto">
                        <Package size={20} />
                      </div>
                      <p className="text-center text-xl font-semibold">{outOfStockProducts}</p>
                      <p className="text-center text-sm text-neutral-600">Out of Stock</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;