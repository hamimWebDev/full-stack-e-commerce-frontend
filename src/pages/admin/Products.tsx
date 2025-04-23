import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import ProductTableRow from '../../components/admin/ProductTableRow';
import Button from '../../components/ui/Button';
import { products as productsData } from '../../data/products';
import { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', ...Array.from(new Set(productsData.map(p => p.category)))];
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                         product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleEditProduct = (id: string) => {
    // In a real app, this would open a modal or navigate to an edit page
    console.log('Edit product:', id);
  };
  
  const handleDeleteProduct = (id: string) => {
    // In a real app, this would show a confirmation dialog
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-8 md:ml-64">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Products</h1>
            <p className="text-neutral-600">Manage your product inventory</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button icon={<Plus size={18} />}>
              Add New Product
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
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <select
                className="py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {filteredProducts.length === 0 ? (
            <div className="p-4 sm:p-8 text-center">
              <p className="text-neutral-600 mb-4">No products found matching your search criteria.</p>
              <Button variant="outline" onClick={() => { setSearch(''); setSelectedCategory('all'); }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Stock</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <ProductTableRow 
                      key={product.id}
                      product={product}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                    />
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

export default AdminProducts;