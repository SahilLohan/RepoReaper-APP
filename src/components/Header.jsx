// Header.jsx
import React, { useState } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <nav className="max-w-screen-lg mx-auto flex flex-wrap justify-between items-center p-4">
        {/* Logo */}
        <a href="#" className="text-xl font-semibold">
          MyLogo
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Features</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Pricing</a>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          aria-expanded={navOpen}
        >
          {navOpen ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Mobile menu */}
        {navOpen && (
          <div className="w-full md:hidden mt-2 space-y-2 flex flex-col">
            <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">
              Home
            </a>
            <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">
              Features
            </a>
            <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">
              Pricing
            </a>
            <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
