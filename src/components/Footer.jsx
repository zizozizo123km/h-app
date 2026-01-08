import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'New Arrivals', href: '/shop/new' },
      { name: 'Best Sellers', href: '/shop/best' },
      { name: 'Collections', href: '/shop/collections' },
      { name: 'Sale', href: '/shop/sale' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping & Delivery', href: '/shipping' },
      { name: 'Returns Policy', href: '/returns' },
      { name: 'Help Center', href: '/help' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Grid Layout: Brand, Links, and Newsletter */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:grid-cols-5">
          
          {/* Column 1: Brand Identity */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-3xl font-extrabold text-indigo-400 tracking-wider">
              E-COMMERCE
            </h3>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Curating the finest selection of modern goods for your everyday life.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-indigo-400 transition duration-300"><FaFacebook size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-400 transition duration-300"><FaTwitter size={20} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-indigo-400 transition duration-300"><FaInstagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-400 transition duration-300"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Columns 2, 3, 4: Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-indigo-400 transition duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Newsletter Signup */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Get 10% off your first order and exclusive updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="p-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright and Payment */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          
          {/* Copyright */}
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex space-x-6 text-gray-500">
            <a href="/privacy" className="hover:text-indigo-400 transition duration-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-400 transition duration-300">Terms of Service</a>
          </div>

          {/* Payment Icons */}
          <div className="flex space-x-3 text-gray-500 mt-4 md:mt-0">
            <FaCcVisa size={30} className="hover:text-white transition duration-300" />
            <FaCcMastercard size={30} className="hover:text-white transition duration-300" />
            <FaPaypal size={30} className="hover:text-white transition duration-300" />
            {/* Add more payment icons as needed */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;