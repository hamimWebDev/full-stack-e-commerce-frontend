import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, AlertCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { orders } from '../../data/orders';
import { useAuth } from '../../context/AuthContext';

const UserOrders: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  
  // Filter orders to show only current user's orders
  const userOrders = orders.filter(order => 
    order.user.id === user?.id && 
    (order.id.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'accent';
      case 'processing':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'warning';
    }
  };
  
  if (userOrders.length === 0 && !search) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
              <Package size={32} className="text-neutral-500" />
            </div>
            
            <h1 className="text-2xl font-semibold mb-4">No Orders Yet</h1>
            <p className="text-neutral-600 mb-8">You haven't placed any orders yet. Start shopping to find products you'll love!</p>
            
            <Link to="/shop">
              <Button icon={<ArrowRight size={18} />} iconPosition="right">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          
          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search orders by order ID..."
                className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          {userOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-neutral-400" />
              <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
              <p className="text-neutral-600 mb-4">
                We couldn't find any orders matching your search criteria.
              </p>
              <Button variant="outline" onClick={() => setSearch('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {userOrders.map(order => (
                <motion.div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 border-b border-neutral-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="font-medium">Order #{order.id}</span>
                          <span className="mx-2 text-neutral-300">|</span>
                          <span className="text-sm text-neutral-500">
                            {new Date(order.createdAt).toLocaleDateString(undefined, { 
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 sm:mt-0">
                        <Link to={`/order/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    <ul className="divide-y divide-neutral-200">
                      {order.products.map(product => (
                        <li key={product.id} className="py-3 flex items-center">
                          <span className="font-medium mr-2">{product.quantity}x</span>
                          <span className="text-neutral-800">{product.name}</span>
                          <span className="ml-auto font-medium">${(product.price * product.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;