import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">NH-Tech</h3>
            <p className="mb-4 text-neutral-400">Luxury shopping experience with premium products and exceptional service.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/new-arrivals" className="text-neutral-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/bestsellers" className="text-neutral-400 hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/shop/electronics" className="text-neutral-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="text-neutral-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop/furniture" className="text-neutral-400 hover:text-white transition-colors">
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/shop/sale" className="text-neutral-400 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-neutral-400 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Fifth Avenue, New York, NY 10160</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>support@nh-tech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} NH-Tech. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/40x25/CCCCCC/666666?text=VISA" alt="Visa" className="h-6" />
              <img src="https://via.placeholder.com/40x25/CCCCCC/666666?text=MC" alt="Mastercard" className="h-6" />
              <img src="https://via.placeholder.com/40x25/CCCCCC/666666?text=AMEX" alt="American Express" className="h-6" />
              <img src="https://via.placeholder.com/40x25/CCCCCC/666666?text=PP" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;