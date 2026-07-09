import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Layout & Common
import Header from './layout/Header';
import Footer from './layout/Footer';
import LiveChat from './components/LiveChat';

// Client Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Projects from './pages/Projects';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminLeads from './pages/admin/AdminLeads';
import AdminAppointments from './pages/admin/AdminAppointments';

// Icons
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Global Floating Widgets Component
const FloatingWidgets = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky WhatsApp - Floating left */}
      <a
        href="https://wa.me/18005557788"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        title="WhatsApp Chat Support"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>

      {/* Floating Call Button */}
      <a
        href="tel:+18005557788"
        className="fixed bottom-24 left-6 z-40 bg-accent hover:bg-gold-hover text-primary p-3.5 rounded-full shadow-2xl hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        title="Call Hotline Desk"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-primary dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 text-accent hover:bg-accent hover:text-primary p-3.5 rounded-full shadow-2xl hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-fade-in"
          title="Back to Top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Live Chat Concierge */}
      <LiveChat />
    </>
  );
};

// Condition-based Layout wrapper to exclude header/footer on admin dashboard routes
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-dark-bg text-primary dark:text-dark-text transition-colors duration-300">
      {!isAdminRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingWidgets />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <LayoutWrapper>
              <Routes>
                {/* Client Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/compare" element={<Compare />} />

                {/* Admin/Agent Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/properties" element={<AdminProperties />} />
                <Route path="/admin/leads" element={<AdminLeads />} />
                <Route path="/admin/appointments" element={<AdminAppointments />} />
              </Routes>
            </LayoutWrapper>
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
