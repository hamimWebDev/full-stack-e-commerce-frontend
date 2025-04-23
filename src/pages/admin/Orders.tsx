import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import OrdersTable from '../../components/admin/OrdersTable';
import { orders as ordersData } from '../../data/orders';
import { Order } from '../../types';
import Badge from '../../components/ui/Badge';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                          order.user.name.toLowerCase().includes(search.toLowerCase()) ||
                          order.user.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewOrderDetails = (orderId: string) => {
    // In a real app, this would navigate to an order details page or open a modal
    console.log('View order details:', orderId);
  };
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Orders</h1>
          <p className="text-neutral-600">Manage customer orders</p>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or email..."
                className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <select
                className="py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Badge
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Badge>
            <Badge
              variant={statusFilter === 'pending' ? 'warning' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </Badge>
            <Badge
              variant={statusFilter === 'processing' ? 'primary' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('processing')}
            >
              Processing
            </Badge>
            <Badge
              variant={statusFilter === 'shipped' ? 'accent' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('shipped')}
            >
              Shipped
            </Badge>
            <Badge
              variant={statusFilter === 'delivered' ? 'success' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('delivered')}
            >
              Delivered
            </Badge>
            <Badge
              variant={statusFilter === 'cancelled' ? 'error' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('cancelled')}
            >
              Cancelled
            </Badge>
          </div>
          
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 text-center">
              <p className="text-neutral-600 mb-4">No orders found matching your search criteria.</p>
              <button 
                className="text-primary-600 hover:text-primary-800"
                onClick={() => { setSearch(''); setStatusFilter('all'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <OrdersTable 
              orders={filteredOrders} 
              onViewDetails={handleViewOrderDetails} 
            />
          )}
        </motion.div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 text-sm text-neutral-600">
          <p>
            <strong>Note:</strong> Orders are automatically updated when their status changes. You can manually update an order's status by viewing its details.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;