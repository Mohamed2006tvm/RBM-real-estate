import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { Menu, X, Sun, Moon, Phone, Heart, Layers } from 'lucide-react';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { wishlist, compareList } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we are on the Home page (hero section transparency)
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg border-b border-white/10 dark:border-dark-border/40 py-4'
          : isHomePage
          ? 'bg-transparent py-6'
          : 'bg-primary dark:bg-dark-bg border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl lg:text-lg xl:text-xl font-bold tracking-wider text-white flex items-center">
              RBM<span className="text-accent ml-1 font-sans text-lg lg:text-xs xl:text-base font-normal">REALESTATE</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex lg:space-x-2.5 xl:space-x-4 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium uppercase transition-colors duration-200 hover:text-accent lg:text-[11px] lg:tracking-tight xl:text-xs xl:tracking-normal 2xl:text-[13px] ${
                    isActive ? 'text-accent' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center lg:space-x-3 xl:space-x-4">       

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-slate-300 hover:text-accent transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Book Consultation Button */}
            <Link
              to="/contact"
              className="bg-accent hover:bg-gold-hover text-primary font-semibold lg:px-2.5 lg:py-1.5 xl:px-4 xl:py-2 rounded-sm lg:text-[10px] xl:text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-slate-300 hover:text-accent transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-accent transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary/95 dark:bg-dark-bg/95 backdrop-blur-lg border-b border-white/10 dark:border-dark-border/40 py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 mb-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-semibold tracking-wide uppercase transition-colors py-1 ${
                    isActive ? 'text-accent' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex flex-col space-y-4 border-t border-white/10 pt-4">
            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="flex items-center text-slate-300 hover:text-accent space-x-2">
                <Heart className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold">Wishlist ({wishlist.length})</span>
              </Link>
              <Link to="/compare" className="flex items-center text-slate-300 hover:text-accent space-x-2">
                <Layers className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold">Compare ({compareList.length})</span>
              </Link>
            </div>
            
            <a
              href="tel:+18005557788"
              className="flex items-center text-base font-semibold text-accent"
            >
              <Phone className="w-4 h-4 mr-2" />
              +1 800 555 7788
            </a>
            
            <Link
              to="/contact"
              className="bg-accent hover:bg-gold-hover text-primary font-semibold py-3 rounded text-center text-sm uppercase tracking-wider transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
