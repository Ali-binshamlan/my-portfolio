// src/components/Navbar.jsx

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900/60 backdrop-blur-xl text-white py-3 px-4 shadow-2xl sticky top-0 z-50 border-gray-600/50">
      <div className=" mx-auto flex items-center justify-between">
        {/* Desktop Links - Centered */}
        <ul className="hidden md:flex gap-6 items-center justify-center text-lg mx-auto bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-500/30 shadow-inner px-8 py-2">
          <Link to="/">
            <li className="hover:text-purple-300 transition-all duration-300 cursor-pointer px-5 py-1 rounded-xl hover:bg-white/10 font-medium text-gray-200 hover:scale-105 border border-transparent hover:border-purple-400/30">
              Home
            </li>
          </Link>
          <Link to="/projects">
            <li className="hover:text-purple-300 transition-all duration-300 cursor-pointer px-5 py-1 rounded-xl hover:bg-white/10 font-medium text-gray-200 hover:scale-105 border border-transparent hover:border-purple-400/30">
              Projects
            </li>
          </Link>
          <Link to="/Contact">
            <li className="hover:text-purple-300 transition-all duration-300 cursor-pointer px-5 py-1 rounded-xl hover:bg-white/10 font-medium text-gray-200 hover:scale-105 border border-transparent hover:border-purple-400/30">
              Contact
            </li>
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-gray-200 hover:text-purple-300 transition-all duration-300 bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-gray-500/40 hover:border-purple-400/50 hover:scale-105 shadow-lg"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-800/80 backdrop-blur-2xl rounded-3xl border border-gray-500/40 shadow-2xl py-6 mx-auto max-w-xs">
          <ul className="space-y-3 text-center text-lg">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <li className="hover:text-purple-300 transition-all duration-300 cursor-pointer py-4 rounded-2xl hover:bg-white/10 font-medium text-gray-200 mx-4 border border-transparent hover:border-purple-400/30 hover:scale-105">
                Home
              </li>
            </Link>
            <Link to="/projects" onClick={() => setIsOpen(false)}>
              <li className="hover:text-purple-300 transition-all duration-300 cursor-pointer py-4 rounded-2xl hover:bg-white/10 font-medium text-gray-200 mx-4 border border-transparent hover:border-purple-400/30 hover:scale-105">
                Projects
              </li>
            </Link>
            <Link to="/Contact" onClick={() => setIsOpen(false)}>
              <li className="hover:text-purple-300 transition-all duration-300 cursor-pointer py-4 rounded-2xl hover:bg-white/10 font-medium text-gray-200 mx-4 border border-transparent hover:border-purple-400/30 hover:scale-105">
                Contact
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
