// src/components/Navbar.jsx

import { useState, useEffect } from "react";
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Projects", href: "/projects", icon: FaProjectDiagram },
    { name: "Contact", href: "/Contact", icon: FaEnvelope },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:block fixed top-0 left-0 w-full z-50 backdrop-blur-xl py-3 shadow-2xl"
      >
        <div className="flex justify-center">
          <motion.div className="flex items-center justify-center px-8 border rounded-2xl backdrop-blur-md py-3 w-[500px] shadow-2xl shadow-indigo-500/20">
            <motion.ul
              className="flex items-center space-x-2 text-white relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.li
                    key={link.name}
                    className="relative"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to={link.href}
                      className={`relative px-5 py-2 overflow-hidden group flex items-center gap-2 rounded-lg transition-all duration-300 ${
                        isActive(link.href)
                          ? "text-white"
                          : "text-gray-200 hover:text-white"
                      }`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Animated Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale:
                            hoveredIndex === index || isActive(link.href)
                              ? 1
                              : 0,
                          opacity:
                            hoveredIndex === index || isActive(link.href)
                              ? 1
                              : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />

                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale:
                            hoveredIndex === index || isActive(link.href)
                              ? 1.2
                              : 1,
                          rotate: hoveredIndex === index ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={16} className="relative z-10" />
                      </motion.div>

                      {/* Text */}
                      <span className="relative z-10 font-medium text-sm transition-all duration-300">
                        {link.name}
                      </span>

                      {/* Active Indicator */}
                      {isActive(link.href) && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-amber-300 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation - Smaller Version */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full z-50"
      >
        <div className="w-full bg-gradient-to-r from-blue-950 to-45% backdrop-blur-2xl rounded-t-xl border border-blue-400/40 shadow-xl shadow-blue-500/20 overflow-hidden">
          <div className="flex justify-around items-center py-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.name}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.href}
                    className={`flex flex-col items-center rounded-lg transition-all duration-300 group px-1.5 py-1 ${
                      isActive(link.href)
                        ? "bg-blue-600/30 border border-blue-400/60"
                        : "bg-transparent border border-transparent hover:bg-blue-500/20"
                    }`}
                  >
                    <motion.div
                      className={`p-2 rounded-full flex items-center justify-center ${
                        isActive(link.href)
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-amber-500/30"
                          : "bg-blue-700/50 group-hover:bg-blue-600/70 shadow-md shadow-blue-500/20"
                      }`}
                      animate={{
                        scale: isActive(link.href) ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        size={16} // تصغير الأيقونة
                        className={
                          isActive(link.href)
                            ? "text-white"
                            : "text-blue-200 group-hover:text-white"
                        }
                      />
                    </motion.div>

                    <span
                      className={`font-medium text-[10px] mt-1.5 ${
                        isActive(link.href)
                          ? "text-amber-300 font-bold"
                          : "text-blue-200 group-hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>

                    {isActive(link.href) && (
                      <motion.div
                        className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md shadow-amber-400/40"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
