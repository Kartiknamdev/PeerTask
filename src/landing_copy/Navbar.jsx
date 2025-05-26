import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/ptblue.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const debouncedScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(handleScroll, 100);
    };
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-lg backdrop-blur-sm' : 'bg-white/80'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="z-50">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={logo}
                alt="PeerTask Logo"
                className="h-12 w-12 object-contain"
                loading="lazy"
              />
              <span className={`text-xl font-bold text-blue-600 ${menuOpen ? 'text-white md:text-blue-600' : 'text-blue-600'}`}>
                PeerTask
              </span>
            </div>
          </NavLink>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen
                ? 'absolute rotate-45 bg-white'
                : 'bg-gray-800 transform-none'
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'bg-gray-800'
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen
                ? 'absolute -rotate-45 bg-white'
                : 'bg-gray-800 transform-none'
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-blue-600 z-40 flex flex-col items-center justify-center md:hidden"
            >
              <div className="w-full max-w-sm mx-auto px-6">
                <ul className="flex flex-col items-center space-y-8">
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="features"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-2xl font-medium hover:text-blue-200 transition-colors"
                    >
                      Features
                    </Link>
                  </motion.li>
                  <li>
                    <NavLink
                      to="how-it-works"
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-2xl font-medium hover:text-blue-200 transition-colors"
                    >
                      How It Works
                    </NavLink>
                  </li>
                  <li>
                    <Link
                      to="testimonials"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-2xl font-medium hover:text-blue-200 transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="faq"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-2xl font-medium hover:text-blue-200 transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      to="/ppt"
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-2xl font-medium hover:text-blue-200 transition-colors"
                    >
                      About Us
                    </NavLink>
                  </li>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col w-full gap-4 pt-8"
                  >
                    <NavLink
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg text-center font-medium hover:bg-blue-50 transition-colors"
                    >
                      Log In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg text-center font-medium hover:bg-blue-400 transition-colors"
                    >
                      Sign Up
                    </NavLink>
                  </motion.div>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="features"
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition cursor-pointer text-lg md:text-base font-medium"
              >
                Features
              </Link>
            </li>
            <li>
              <NavLink
                to="how-it-works"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                How It Works
              </NavLink>
            </li>
            <li>
              <Link
                to="testimonials"
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition cursor-pointer"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="faq"
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition cursor-pointer"
              >
                FAQ
              </Link>
            </li>
            <li>
              <NavLink
                to="/ppt"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                About Us
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/login"
              className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
