import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ShieldAlert } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-primary text-slate-300 border-t border-white/5 pt-16 pb-8 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info & Newsletter */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                RBM<span className="text-accent ml-1 font-sans text-lg font-normal">REALESTATE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Crafting portfolios of world-class premium residential and commercial spaces for discerning families and global investors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-accent transition-colors"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors"><FaLinkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-6 font-serif border-l-2 border-accent pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-accent transition-colors">Properties</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Latest Blog</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-6 font-serif border-l-2 border-accent pl-3">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-accent transition-colors">Property Buying</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Property Selling</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Commercial Leasing</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Investment Consulting</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Home Loans Support</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Legal & Documentation</Link></li>
            </ul>
          </div>

          {/* Newsletter Box & Certifications */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-4 font-serif border-l-2 border-accent pl-3">
                Newsletter
              </h3>
              <p className="text-xs text-slate-400 mb-4 font-light">
                Subscribe to receive private off-market listings and investment insights.
              </p>
              <form onSubmit={handleSubscribe} className="flex relative">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/40 border border-white/10 text-white text-xs px-4 py-3 w-full focus:outline-none focus:border-accent rounded-sm pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-accent hover:text-white transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center text-xs text-accent mt-2 animate-fade-in">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Subscription confirmed. Thank you!
                </div>
              )}
            </div>

            {/* RERA Certified Badge */}
            <div className="border border-accent/20 bg-accent/5 p-4 rounded-sm flex items-center space-x-3">
              <ShieldAlert className="w-8 h-8 text-accent shrink-0" />
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  RERA Certified
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  All listed projects are regulatory compliant. Agent ID: RERA-99882.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-400 font-light">
          <p>&copy; {new Date().getFullYear()} RBM Realestate. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
