import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setForm({ name: '', email: '', phone: '', msg: '' });
    }, 2500);
  };

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Connect With Us</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            Schedule Private Consultation
          </h1>
          <div className="w-12 h-0.5 bg-accent mt-4"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Contact Details & Links */}
          <div className="space-y-8">
            <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white">
              Corporate Headquarters
            </h2>
            <p className="text-slate-500 dark:text-dark-text-muted text-xs sm:text-sm leading-relaxed font-light">
              Visit our luxury private boardroom or connect directly with our global advisory desk. We operate strictly by appointment to guarantee total privacy and dedicated attention.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address */}
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-sm">
                <MapPin className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Office Address</h3>
                  <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed font-light">
                    784 Fifth Avenue, <br />
                    Upper East Side, <br />
                    New York, NY 10021
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-sm">
                <Clock className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Working Hours</h3>
                  <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed font-light">
                    Mon - Sat: 9:00 AM - 7:00 PM <br />
                    Sunday: Closed <br />
                    Advisory: 24/7 Available
                  </p>
                </div>
              </div>

              {/* Phone Contacts */}
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-sm">
                <Phone className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Hotline Contacts</h3>
                  <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed font-light">
                    General: +1 800 555 7788 <br />
                    Advisory: +1 800 555 7799
                  </p>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-sm">
                <Mail className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Official Email</h3>
                  <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed font-light">
                    general@rbmrealestate.com <br />
                    advisory@rbmrealestate.com
                  </p>
                </div>
              </div>

            </div>

            {/* Floating Action Link Triggers */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-dark-border/10">
              <a
                href="https://wa.me/18005557788"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat via WhatsApp</span>
              </a>

              <a
                href="tel:+18005557788"
                className="flex items-center justify-center space-x-2 bg-primary dark:bg-secondary border border-transparent dark:border-dark-border text-white px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-primary transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline Desk</span>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-8 rounded-sm shadow-md">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-50 dark:border-dark-border/10 pb-3 uppercase tracking-wide">
              Request Callback / Proposal
            </h3>

            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-accent/5 border border-accent/20 rounded-sm animate-fade-in text-accent">
                <CheckCircle2 className="w-16 h-16 mb-4" />
                <h4 className="font-serif text-lg font-bold mb-2">Request Received!</h4>
                <p className="text-xs text-slate-500 dark:text-dark-text-muted max-w-xs leading-relaxed">
                  We have assigned your inquiry to a dedicated relationship consultant. Expect a call shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Brief Message / Requirements</label>
                  <textarea
                    rows="5"
                    required
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-sm focus:outline-none focus:border-accent resize-none"
                    placeholder="e.g. I am looking for a 4 bedroom villa in Beverly Hills with infinity pool."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-gold-hover text-primary py-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Proposal Request</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-2 rounded-sm shadow-sm overflow-hidden h-[450px] relative">
          <iframe
            title="RBM Realestate Corporate Headquarters Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0227181057416!2d-73.96871148459353!3d40.761502979326444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f00109d17d%3A0xc3c5450896065538!2sFifth%20Ave%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1655909872132!5m2!1sen!2sin"
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;
