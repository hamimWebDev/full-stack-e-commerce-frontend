import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, LogOut, Package } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Reset scroll position when route changes
    window.scrollTo(0, 0);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}
  `;

  const textClasses = isScrolled ? 'text-neutral-900' : 'text-neutral-900';

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center lg:ml-20">
            <span className="text-2xl font-bold flex items-center">
              <img src="./public/NH_logo.png" alt="NH-Tech" className="w-10 h-10" />
              <span className="text-primary-600">- Tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${textClasses} hover:text-primary-600 transition-colors font-medium
                  ${location.pathname === item.path ? 'text-primary-600' : ''}
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className={`p-2 rounded-full ${textClasses} hover:bg-neutral-100`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-neutral-100">
              <ShoppingCart size={20} className={textClasses} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-100">
                  <span className="font-medium text-sm">{user?.name.split(' ')[0]}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={user?.profilePhoto || './public/Default-profile-photo.jpeg'}
                      alt={user?.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <div className="flex items-center">
                      <Package size={16} className="mr-2" />
                      Orders
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button size="sm" variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              className={`p-2 ${textClasses} focus:outline-none`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={20} className={textClasses} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className={`p-2 ${textClasses} focus:outline-none`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 py-4 space-y-4 divide-y divide-neutral-100">
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-2 px-2 rounded-md ${location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-800 hover:bg-neutral-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center mb-4 pb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={user?.profilePhoto || './public/Default-profile-photo.jpeg'}
                          alt={user?.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-neutral-500">{user?.email}</p>
                      </div>
                    </div>

                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block py-2 px-2 rounded-md text-neutral-800 hover:bg-neutral-50">
                        Admin Dashboard
                      </Link>
                    )}

                    <Link to="/account" className="block py-2 px-2 rounded-md text-neutral-800 hover:bg-neutral-50">
                      My Account
                    </Link>

                    <Link to="/orders" className="block py-2 px-2 rounded-md text-neutral-800 hover:bg-neutral-50">
                      <div className="flex items-center">
                        <Package size={18} className="mr-2" />
                        My Orders
                      </div>
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full mt-2 flex items-center py-2 px-2 rounded-md text-neutral-800 hover:bg-neutral-50"
                    >
                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login">
                      <Button size="sm" variant="outline" fullWidth>Sign In</Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" fullWidth>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-md p-4  z-40"
          >
            <div className="container mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full border border-neutral-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 text-neutral-400" size={20} />
                <button
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;