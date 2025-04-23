import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut,
  UserPlus,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user || user.role !== 'admin') {
    return null;
  }
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <ShoppingBag size={20} />, label: 'Products', path: '/admin/products' },
    { icon: <Package size={20} />, label: 'Orders', path: '/admin/orders' },
    { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
    { icon: <UserPlus size={20} />, label: 'Create Admin', path: '/admin/create-admin' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' }
  ];
  
  const activeClass = "bg-primary-50 text-primary-700";
  const inactiveClass = "text-neutral-600 hover:bg-neutral-100";
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside 
            className={`fixed md:relative bg-white h-screen w-64 border-r border-neutral-200 flex flex-col z-40`}
            initial={{ x: isMobile ? 300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? 300 : 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center">
                <span className="text-primary-600">Admin</span>
                <span className="ml-1">Panel</span>
              </h2>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              <nav className="px-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center py-3 px-4 rounded-md transition-colors ${
                        isActive ? activeClass : inactiveClass
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="mr-2">
                  <img 
                    src={user?.profilePhoto || './public/Default-profile-photo.jpeg'}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <NavLink 
                  to="/admin/help" 
                  onClick={() => isMobile && setIsOpen(false)}
                  className={`flex items-center py-2 px-3 rounded-md ${inactiveClass}`}
                >
                  <HelpCircle size={18} className="mr-2" />
                  <span>Help & Support</span>
                </NavLink>
                
                <button 
                  onClick={() => {
                    logout();
                    if (isMobile) setIsOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;