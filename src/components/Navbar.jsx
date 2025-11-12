// src/components/Navbar.jsx

import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Projects", href: "/projects", icon: FaProjectDiagram },
    { name: "Contact", href: "/Contact", icon: FaEnvelope },
  ];

  // تأثيرات الحركة
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 mb-20  backdrop-blur-xl py-3 shadow-2xl "
    >
      {/* Mobile Header */}
      <div className="md:hidden flex justify-center w-full px-4">
        <div className="w-full max-w-md  border border-indigo-400/40 backdrop-blur-md rounded-2xl py-2 px-6">
          <div className="flex items-center justify-between w-full">
           
            {/* زر القائمة */}
            <motion.button
              onClick={toggleMenu}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isOpen
                  ? " text-white border border-amber-400/50"
                  : "bg-white/10 text-gray-200 border border-indigo-400/40 hover:border-amber-400/50"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center">
        <motion.div className="flex items-center justify-center px-8 border  rounded-2xl backdrop-blur-md py-3 w-[500px] shadow-2xl shadow-indigo-500/20">
          

          {/* Desktop Navigation Links */}
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
                          hoveredIndex === index || isActive(link.href) ? 1 : 0,
                        opacity:
                          hoveredIndex === index || isActive(link.href) ? 1 : 0,
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md z-40 md:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="w-full bg-black backdrop-blur-2xl rounded-2xl border border-amber-400/40 shadow-2xl shadow-amber-500/20 overflow-hidden">
                {/* Menu Items */}
                <motion.div
                  className="p-4 space-y-2"
                  variants={staggerContainer}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.div key={link.name} variants={itemVariants}>
                        <Link
                          to={link.href}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                            isActive(link.href)
                              ? "bg-gradient-to-r from-amber-400/20 to-orange-400/20 border border-amber-400/40"
                              : "bg-white/5 border border-transparent hover:bg-white/10 hover:border-amber-400/30"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            className={`p-2 rounded-lg ${
                              isActive(link.href)
                                ? "bg-gradient-to-r from-amber-400 to-orange-500"
                                : "bg-white/10 group-hover:bg-amber-400/20"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon
                              size={18}
                              className={
                                isActive(link.href)
                                  ? "text-white"
                                  : "text-gray-200 group-hover:text-white"
                              }
                            />
                          </motion.div>

                          <span
                            className={`font-medium flex-1 text-sm ${
                              isActive(link.href)
                                ? "text-white"
                                : "text-gray-200 group-hover:text-white"
                            }`}
                          >
                            {link.name}
                          </span>

                          <motion.div
                            className="opacity-0 group-hover:opacity-100 text-amber-300"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
