// src/components/Navbar.jsx

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-wide hover:text-purple-400 transition duration-300">
            Ali
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          <Link to="/">
            <li className="hover:text-purple-400 hover:underline underline-offset-4 transition duration-300 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/projects">
            <li className="hover:text-purple-400 hover:underline underline-offset-4 transition duration-300 cursor-pointer">
              Projects
            </li>
          </Link>
          <Link to="/Contact">
            <li className="hover:text-purple-400 hover:underline underline-offset-4 transition duration-300 cursor-pointer">
              Contact
            </li>
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-gray-300 hover:text-purple-400 transition duration-300"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center text-lg bg-gray-800 rounded-lg py-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <li className="hover:text-purple-400 hover:underline underline-offset-4 transition duration-300 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/projects" onClick={() => setIsOpen(false)}>
            <li className="hover:text-purple-400 hover:underline underline-offset-4 transition duration-300 cursor-pointer">
              Projects
            </li>
          </Link>
          <Link to="/Contact" onClick={() => setIsOpen(false)}>
            <li className="hover:text-purple-400 hover:underline underline-offset-4 transition duration-300 cursor-pointer">
              Contact
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
}
