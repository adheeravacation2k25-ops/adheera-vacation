import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Compass, Phone
} from 'lucide-react';
import { useDarkMode } from '../../hooks/useScrollAnimation';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'Packages', path: '/packages' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHome
            ? 'bg-white/90 dark:bg-deep-blue/95 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                className={`p-2 rounded-xl ${
                  isScrolled || !isHome 
                    ? 'bg-ocean-500 text-white' 
                    : 'bg-white/20 text-white backdrop-blur-sm'
                }`}
              >
                <Compass size={24} />
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-xl font-display font-bold leading-tight ${
                  isScrolled || !isHome 
                    ? 'text-deep-blue dark:text-white' 
                    : 'text-white'
                }`}>
                  Adheera
                </span>
                <span className={`text-xs tracking-widest uppercase ${
                  isScrolled || !isHome 
                    ? 'text-ocean-600 dark:text-ocean-400' 
                    : 'text-white/80'
                }`}>
                  Vacation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Hover only, no active backgrounds */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isScrolled || !isHome
                      ? 'text-gray-700 dark:text-gray-200 hover:text-ocean-600 dark:hover:text-ocean-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Underline indicator on hover */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'w-6 bg-ocean-500'
                      : 'w-0 group-hover:w-6 bg-ocean-400'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggle}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  isScrolled || !isHome
                    ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Contact Button - Desktop */}
              <Link
                to="/contact"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-ocean-500 text-white text-sm font-semibold rounded-full hover:bg-ocean-600 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/30"
              >
                <Phone size={16} />
                <span>Book Now</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                  isScrolled || !isHome
                    ? 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-full bg-white dark:bg-deep-blue shadow-2xl"
            >
              <div className="p-6 pt-24 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                        location.pathname === link.path
                          ? 'text-ocean-600 dark:text-ocean-400'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-ocean-500 text-white font-semibold rounded-xl hover:bg-ocean-600 transition-all"
                  >
                    <Phone size={18} />
                    Book Your Trip
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
