"use client"
import React, { useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            {/* <img
              className="h-8 w-auto"
              src="images.unsplash.com/photo-1614332287897-cdc485fa562d?w=128&h=128&fit=crop"
              alt="Logo"
            /> */}
            <span className="ml-2 text-xl font-bold text-gray-800">URLify</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <RiCloseLine size={24} />
              ) : (
                <RiMenu3Line size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600"
            >
              Pricing
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
