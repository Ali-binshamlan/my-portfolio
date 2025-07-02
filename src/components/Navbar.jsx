// src/components/Navbar.jsx

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="text-black bg-transparent py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Ali</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 cursor-pointer">About</li>
          <Link to="/projects"><li className="hover:text-yellow-300 cursor-pointer">Projects</li></Link>
          <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center text-lg">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 cursor-pointer">About</li>
          <li className="hover:text-yellow-300 cursor-pointer">Projects</li>
          <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
        </ul>
      )}
    </nav>
  );
}
