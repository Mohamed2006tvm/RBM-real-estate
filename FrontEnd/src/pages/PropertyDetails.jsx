import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, BedDouble, Bath, Square, Calendar, User, Heart,
  Layers, Check, ChevronLeft, Phone, Mail, Clock, ShieldCheck
} from 'lucide-react';

import { properties } from '../utils/mockData';
import { useWishlist } from '../context/WishlistContext';
import Lightbox from '../components/Lightbox';
import MortgageCalculator from '../components/MortgageCalculator';
import PropertyCard from '../components/PropertyCard';

const PropertyDetails = () => {
  const { id } = useParams();
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompareList } = useWishlist();

  // Find Property
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="page-container flex flex-col items-center justify-center bg-bg-light dark:bg-dark-bg text-center py-20">
        <h2 className="font-serif text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-sm text-slate-500 mb-8">The luxury residence you are looking for does not exist or has been sold.</p>
        <Link to="/properties" className="bg-accent text-primary px-6 py-3 font-semibold uppercase tracking-wider text-xs">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Form State
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', msg: `I am interested in viewing: ${property.title}` });

  const saved = isInWishlist(property.id);
  const compared = isInCompareList(property.id);

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryForm({ name: '', email: '', phone: '', msg: `I am interested in viewing: ${property.title}` });
    }, 2500);
  };

  // Find similar properties (same type or location, excluding current)
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.location.includes(property.location.split(',')[0])))
    .slice(0, 3);

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/properties" className="inline-flex items-center text-xs font-semibold text-slate-500 dark:text-dark-text-muted hover:text-accent mb-6 uppercase tracking-wider transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Listings
        </Link>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {/* Main big image */}
          <div
            className="md:col-span-2 h-[450px] overflow-hidden rounded-sm relative group cursor-pointer border border-slate-100 dark:border-dark-border/20 shadow-sm"
            onClick={() => {
              setLightboxIndex(0);
              setIsLightboxOpen(true);
            }}
          >
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
              <span className="bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-sm backdrop-blur-sm">Click to view all photos</span>
            </div>
          </div>

          {/* Secondary images */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 h-[450px]">
            {property.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-sm relative group cursor-pointer border border-slate-100 dark:border-dark-border/20 shadow-sm"
                onClick={() => {
                  setLightboxIndex(idx + 1);
                  setIsLightboxOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
          
          {/* Left Details Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title Block */}
            <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-8 rounded-sm shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <span className="bg-accent text-primary text-[10px] font-bold px-3 py-1 tracking-wider uppercase rounded-sm mb-2 inline-block">
                    {property.status} &bull; {property.type}
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-slate-500 dark:text-dark-text-muted text-xs mt-2">
                    <MapPin className="w-4 h-4 mr-1 text-accent" />
                    <span>{property.location}</span>
                  </div>
                </div>
                
                {/* Price and Actions */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent font-serif mb-3">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleWishlist(property)}
                      className={`p-2.5 border rounded-sm transition-all duration-300 cursor-pointer ${
                        saved
                          ? 'bg-accent border-accent text-primary'
                          : 'border-slate-200 dark:border-dark-border text-slate-500 dark:text-dark-text-muted hover:border-accent hover:text-accent'
                      }`}
                      title={saved ? 'Remove Wishlist' : 'Add Wishlist'}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => toggleCompare(property)}
                      className={`p-2.5 border rounded-sm transition-all duration-300 cursor-pointer ${
                        compared
                          ? 'bg-accent border-accent text-primary'
                          : 'border-slate-200 dark:border-dark-border text-slate-500 dark:text-dark-text-muted hover:border-accent hover:text-accent'
                      }`}
                      title={compared ? 'Remove Compare' : 'Add to Compare'}
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RERA Certification Block */}
              {property.reraId && (
                <div className="flex items-center space-x-2 border-t border-slate-100 dark:border-dark-border/10 pt-4 mt-6 text-xs text-slate-600 dark:text-dark-text-muted">
                  <ShieldCheck className="w-4.5 h-4.5 text-accent" />
                  <span>
                    RERA Compliant Listing. Registration Number: <span className="font-bold text-slate-800 dark:text-white">{property.reraId}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-sm text-center">
              {property.beds > 0 && (
                <div className="border-r border-slate-100 dark:border-dark-border/10 last:border-0 flex flex-col items-center">
                  <BedDouble className="w-5 h-5 text-accent mb-2" />
                  <span className="text-sm font-bold text-slate-800 dark:text-white">{property.beds} Bedrooms</span>
                </div>
              )}
              <div className="border-r border-slate-100 dark:border-dark-border/10 last:border-0 flex flex-col items-center">
                <Bath className="w-5 h-5 text-accent mb-2" />
                <span className="text-sm font-bold text-slate-800 dark:text-white">{property.baths} Bathrooms</span>
              </div>
              <div className="border-r border-slate-100 dark:border-dark-border/10 last:border-0 flex flex-col items-center">
                <Square className="w-5 h-5 text-accent mb-2" />
                <span className="text-sm font-bold text-slate-800 dark:text-white">{property.area} Sq Ft</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-5 h-5 text-accent mb-2" />
                <span className="text-sm font-bold text-slate-800 dark:text-white">Built: {property.yearBuilt}</span>
              </div>
            </div>

            {/* Overview / Description */}
            <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-8 rounded-sm shadow-sm">
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-50 dark:border-dark-border/10 pb-3">
                Property Overview
              </h3>
              <p className="text-slate-500 dark:text-dark-text-muted text-xs sm:text-sm leading-relaxed font-light">
                {property.description}
              </p>
            </div>

            {/* Amenities Checklist */}
            <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-8 rounded-sm shadow-sm">
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-50 dark:border-dark-border/10 pb-3">
                Luxury Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs text-slate-600 dark:text-dark-text-muted">
                    <div className="bg-accent/10 text-accent p-1 rounded-full shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgage Calculator */}
            <MortgageCalculator defaultPrice={property.price} />

          </div>

          {/* Right Consultation Column */}
          <div className="space-y-8 sticky top-24">
            
            {/* RM Contact Card */}
            <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-8 rounded-sm shadow-md">
              <h3 className="font-serif text-base font-bold text-slate-800 dark:text-white mb-6 text-center uppercase tracking-wide">
                Dedicated Concierge
              </h3>
              
              {/* Agent Profile */}
              <div className="flex items-center space-x-4 mb-6 border-b border-slate-100 dark:border-dark-border/10 pb-4">
                <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-primary font-bold font-serif text-lg shrink-0">
                  AE
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Alexander Sterling</h4>
                  <p className="text-[10px] text-accent tracking-wider uppercase font-semibold">Private Advisory Lead</p>
                </div>
              </div>

              {/* Direct links */}
              <div className="space-y-3 mb-6 text-xs text-slate-600 dark:text-dark-text-muted">
                <a href="tel:+18005557788" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-accent" />
                  +1 800 555 7788
                </a>
                <a href="mailto:sterling@rbmrealestate.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-accent" />
                  sterling@rbmrealestate.com
                </a>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-accent" />
                  Available: 9:00 AM - 7:00 PM EST
                </div>
              </div>

              {/* Inquiry Form */}
              {inquirySubmitted ? (
                <div className="bg-accent/10 text-accent text-center p-6 rounded-sm border border-accent/20 animate-fade-in">
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <h5 className="font-serif font-bold text-sm mb-1">Inquiry Submitted!</h5>
                  <p className="text-[10px] leading-relaxed">Our concierge will contact you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3 px-3.5 rounded-sm focus:outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3 px-3.5 rounded-sm focus:outline-none focus:border-accent"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3 px-3.5 rounded-sm focus:outline-none focus:border-accent"
                  />
                  <textarea
                    rows="3"
                    required
                    value={inquiryForm.msg}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, msg: e.target.value })}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3 px-3.5 rounded-sm focus:outline-none focus:border-accent resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-primary dark:bg-accent text-white dark:text-primary hover:bg-accent hover:text-primary dark:hover:bg-gold-hover text-xs font-bold uppercase tracking-wider py-3.5 rounded-sm transition-all duration-300 cursor-pointer border border-transparent hover:border-accent"
                  >
                    Request Details
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Map Section */}
            <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-4 rounded-sm shadow-sm overflow-hidden h-[250px] relative">
              <iframe
                title="Property Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528082184!2d-74.11976384786348!3d40.6976700634128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xcda8f48961385a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1655909289231!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>

        {/* Similar Listings Section */}
        {similarProperties.length > 0 && (
          <div className="border-t border-slate-100 dark:border-dark-border/20 pt-16 mt-16">
            <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-8">
              Similar Luxury Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((similar) => (
                <PropertyCard key={similar.id} property={similar} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Component */}
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            images={property.images}
            initialIndex={lightboxIndex}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyDetails;
