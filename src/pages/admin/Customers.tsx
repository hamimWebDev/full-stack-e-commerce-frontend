import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, ExternalLink, UserPlus } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import Button from '../../components/ui/Button';
import { users as usersData } from '../../data/users';
import { User } from '../../types';

const AdminCustomers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData);
  const [search, setSearch] = useState('');
  
  // Filter users (only customers, not admins)
  const customers = users.filter(user => 
    user.role === 'customer' && 
    (user.name.toLowerCase().includes(search.toLowerCase()) || 
     user.email.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-8 md:ml-64">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Customers</h1>
            <p className="text-neutral-600">Manage your customer accounts</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button icon={<UserPlus size={18} />}>
              Add New Customer
            </Button>
          </div>
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
                placeholder="Search customers by name or email..."
                className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {customers.length === 0 ? (
            <div className="p-4 sm:p-8 text-center">
              <p className="text-neutral-600 mb-4">No customers found matching your search criteria.</p>
              <Button variant="outline" onClick={() => setSearch('')}>
                Reset Search
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-neutral-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                            <img src={customer.avatar} alt={customer.name} className="h-10 w-10 object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">{customer.name}</div>
                            <div className="text-sm text-neutral-500">ID: {customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{customer.email}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {Math.floor(Math.random() * 6)} {/* Mock data for demo */}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        ${(Math.random() * 1000).toFixed(2)} {/* Mock data for demo */}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-primary-600 hover:text-primary-800"
                            title="View Customer Details"
                          >
                            <ExternalLink size={18} />
                          </button>
                          <button
                            className="text-primary-600 hover:text-primary-800"
                            title="Email Customer"
                          >
                            <Mail size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminCustomers;