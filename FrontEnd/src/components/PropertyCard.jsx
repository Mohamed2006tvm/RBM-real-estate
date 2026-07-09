import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Layers, MapPin, BedDouble, Bath, Square, Calendar, User, Mail, Phone, Clock } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const PropertyCard = ({ property }) => {
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompareList } = useWishlist();
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  const saved = isInWishlist(property.id);
  const compared = isInCompareList(property.id);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsScheduleOpen(false);
      setFormData({ name: '', email: '', phone: '', date: '', time: '' });
    }, 2000);
  };

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        className="group bg-white dark:bg-dark-card/45 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 dark:border-white/5 transition-all duration-300 flex flex-col h-full relative hover:border-accent/30 dark:hover:border-accent/30"
      >
        {/* Image & Badges */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary/95 dark:bg-dark-bg/95 text-white text-xs font-semibold px-3 py-1.5 tracking-wider uppercase rounded-lg border border-accent/30">
              {property.status}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-accent to-gold-light text-primary text-xs font-bold px-3 py-1.5 tracking-wider uppercase rounded-lg">
              {property.type}
            </span>
          </div>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
            <button
              onClick={() => toggleWishlist(property)}
              className={`p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer ${
                saved ? 'bg-gradient-to-r from-accent to-gold-light text-primary' : 'bg-primary text-white hover:bg-gradient-to-r hover:from-accent hover:to-gold-light hover:text-primary'
              }`}
              title={saved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={() => toggleCompare(property)}
              className={`p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer ${
                compared ? 'bg-gradient-to-r from-accent to-gold-light text-primary' : 'bg-primary text-white hover:bg-gradient-to-r hover:from-accent hover:to-gold-light hover:text-primary'
              }`}
              title={compared ? 'Remove from Compare' : 'Compare Property'}
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Price */}
          <div className="text-xl font-bold text-accent mb-2 font-serif">
            {formatPrice(property.price)}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-snug line-clamp-1 hover:text-accent transition-colors font-serif">
            <Link to={`/properties/${property.id}`}>{property.title}</Link>
          </h3>

          {/* Location */}
          <div className="flex items-center text-slate-500 dark:text-dark-text-muted text-xs mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1 text-accent" />
            <span>{property.location}</span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 dark:border-dark-border/20 text-slate-600 dark:text-dark-text-muted mb-4">
            {property.beds > 0 && (
              <div className="flex flex-col items-center text-center">
                <span className="flex items-center text-xs font-semibold text-slate-700 dark:text-white mb-1">
                  <BedDouble className="w-3.5 h-3.5 mr-1 text-accent" />
                  {property.beds}
                </span>
                <span className="text-[10px] uppercase tracking-wider">Beds</span>
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <span className="flex items-center text-xs font-semibold text-slate-700 dark:text-white mb-1">
                <Bath className="w-3.5 h-3.5 mr-1 text-accent" />
                {property.baths}
              </span>
              <span className="text-[10px] uppercase tracking-wider">Baths</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="flex items-center text-xs font-semibold text-slate-700 dark:text-white mb-1">
                <Square className="w-3.5 h-3.5 mr-1 text-accent" />
                {property.area}
              </span>
              <span className="text-[10px] uppercase tracking-wider">Sq Ft</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed mb-6 line-clamp-2 font-light">
            {property.description}
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Link
              to={`/properties/${property.id}`}
              className="border border-primary dark:border-accent/40 text-primary dark:text-white text-center py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-gradient-to-r hover:from-accent hover:to-gold-light hover:text-primary hover:border-transparent dark:hover:text-primary transition-all duration-300"
            >
              View Details
            </Link>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="bg-primary dark:bg-dark-bg hover:bg-gradient-to-r hover:from-accent hover:to-gold-light hover:text-primary dark:hover:bg-gradient-to-r dark:hover:from-accent dark:hover:to-gold-light dark:hover:text-primary text-white text-center py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-transparent hover:shadow-[0_4px_12px_rgba(200,169,106,0.2)] transition-all duration-300 cursor-pointer"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </motion.div>

      {/* Schedule Visit Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleOpen(false)}
              className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 max-w-md w-full p-8 rounded-2xl shadow-2xl relative z-10"
            >
              <h4 className="font-serif text-xl font-bold text-primary dark:text-white mb-2">
                Schedule Private Viewing
              </h4>
              <p className="text-xs text-slate-500 dark:text-dark-text-muted mb-6">
                Fill details to book a private tour for: <span className="font-semibold text-accent">{property.title}</span>.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                  <div className="bg-accent/10 p-4 rounded-full text-accent mb-4">
                    <Calendar className="w-12 h-12" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-2">
                    Viewing Scheduled!
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-dark-text-muted">
                    Our relationship manager will call you shortly to confirm.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-accent to-gold-light hover:from-gold-hover hover:to-accent text-primary text-xs font-bold uppercase tracking-wider py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(200,169,106,0.2)]"
                  >
                    Confirm Booking
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyCard;