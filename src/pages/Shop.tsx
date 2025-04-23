import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Product } from '../types';
import { products } from '../data/products';
import ProductGrid from '../components/store/ProductGrid';

const ITEMS_PER_PAGE = 16;

const Shop: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'featured',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = Array.from(new Set(products.map(product => product.category)));

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply price filters
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      result = result.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= minPrice;
      });
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      result = result.filter(product => {
        const price = product.discountPrice || product.price;
        return price <= maxPrice;
      });
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price-low-high':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'featured',
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.aside
            className="hidden md:block w-64 sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filters
                </h3>

                <div className="mb-4">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </motion.aside>

          {/* Mobile Filters Toggle */}
          <div className="md:hidden w-full mb-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              icon={mobileFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              iconPosition="right"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters {filteredProducts.length !== products.length && `(${filteredProducts.length})`}
            </Button>

            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-lg shadow-sm p-4 mt-2"
              >
                <div className="mb-4">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-neutral-300 rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-neutral-300 rounded-md"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-neutral-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="mr-2"
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Product Display */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                All Products
                <span className="text-neutral-500 ml-2 text-lg">({filteredProducts.length})</span>
              </h1>

              <div className="flex items-center">
                <label className="mr-2 text-neutral-700 text-sm hidden md:inline">Sort by:</label>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="p-2 border border-neutral-300 rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <>
                
                  <ProductGrid
                    products={paginatedProducts}
                    title="Featured Products"
                    description="Discover our handpicked selection of premium products that define quality and style."
                  />
                

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        icon={<ChevronLeft size={16} />}
                      >
                        Previous
                      </Button>

                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'text-neutral-600 hover:bg-neutral-100'
                              }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        icon={<ChevronRight size={16} />}
                        iconPosition="right"
                      >
                        Next
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;