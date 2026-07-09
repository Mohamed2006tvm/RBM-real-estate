import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { properties } from '../utils/mockData';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const routeLocation = useLocation();

  // Filter States
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState(25000000);
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [stage, setStage] = useState('');
  const [sort, setSort] = useState('newest');
  const [reraOnly, setReraOnly] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Load initial search state from Home search form
  useEffect(() => {
    if (routeLocation.state) {
      if (routeLocation.state.location) setLocation(routeLocation.state.location);
      if (routeLocation.state.type) setType(routeLocation.state.type);
      if (routeLocation.state.budget) setMaxPrice(Number(routeLocation.state.budget));
    }
  }, [routeLocation.state]);

  // Handle Filtering and Sorting
  useEffect(() => {
    let result = [...properties];

    if (location) {
      result = result.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (type) {
      result = result.filter((p) => p.type.toLowerCase() === type.toLowerCase());
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= maxPrice);
    }
    if (beds) {
      result = result.filter((p) => p.beds >= Number(beds));
    }
    if (baths) {
      result = result.filter((p) => p.baths >= Number(baths));
    }
    if (stage) {
      result = result.filter((p) => p.stage.toLowerCase() === stage.toLowerCase());
    }
    if (reraOnly) {
      result = result.filter((p) => p.reraId);
    }

    // Sort Logic
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default / Newest (simulated by year built or listing ID order)
      result.sort((a, b) => b.yearBuilt - a.yearBuilt);
    }

    setFilteredProperties(result);
  }, [location, type, maxPrice, beds, baths, stage, sort, reraOnly]);

  const handleResetFilters = () => {
    setLocation('');
    setType('');
    setMaxPrice(25000000);
    setBeds('');
    setBaths('');
    setStage('');
    setSort('newest');
    setReraOnly(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Premium Listings</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            Properties Portfolio
          </h1>
          <div className="w-12 h-0.5 bg-accent mt-4"></div>
        </div>

        {/* Filter Bar Console */}
        <div className="bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 p-6 rounded-2xl shadow-md mb-12 hover:border-accent/15 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-6 border-b border-slate-100 dark:border-dark-border/10 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-white">
              Advanced Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="" className="dark:bg-slate-900">All Locations</option>
                <option value="Manhattan" className="dark:bg-slate-900">Manhattan, NY</option>
                <option value="Beverly Hills" className="dark:bg-slate-900">Beverly Hills, LA</option>
                <option value="Dubai" className="dark:bg-slate-900">Palm Jumeirah, Dubai</option>
                <option value="Miami" className="dark:bg-slate-900">Downtown, Miami</option>
                <option value="London" className="dark:bg-slate-900">Mayfair, London</option>
                <option value="Mumbai" className="dark:bg-slate-900">Bandra, Mumbai</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="" className="dark:bg-slate-900">All Types</option>
                <option value="Penthouse" className="dark:bg-slate-900">Penthouse</option>
                <option value="Villa" className="dark:bg-slate-900">Villa</option>
                <option value="Residential" className="dark:bg-slate-900">Residential Apartment</option>
                <option value="Commercial" className="dark:bg-slate-900">Commercial Suite</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Min Bedrooms</label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="" className="dark:bg-slate-900">Any</option>
                <option value="1" className="dark:bg-slate-900">1+ Beds</option>
                <option value="2" className="dark:bg-slate-900">2+ Beds</option>
                <option value="3" className="dark:bg-slate-900">3+ Beds</option>
                <option value="4" className="dark:bg-slate-900">4+ Beds</option>
                <option value="5" className="dark:bg-slate-900">5+ Beds</option>
                <option value="6" className="dark:bg-slate-900">6+ Beds</option>
              </select>
            </div>

            {/* Construction Stage */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Construction Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="" className="dark:bg-slate-900">All Stages</option>
                <option value="Ready to Move" className="dark:bg-slate-900">Ready to Move</option>
                <option value="Under Construction" className="dark:bg-slate-900">Under Construction</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider">Max Budget</label>
                <span className="text-xs font-bold text-accent">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={25000000}
                step={250000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-wider mb-2 block">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs w-full py-3.5 px-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="newest" className="dark:bg-slate-900">Newest Listed</option>
                <option value="price-low" className="dark:bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="dark:bg-slate-900">Price: High to Low</option>
              </select>
            </div>

            {/* Checkbox & Reset Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <label className="flex items-center space-x-2 text-xs text-slate-600 dark:text-dark-text-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={reraOnly}
                  onChange={(e) => setReraOnly(e.target.checked)}
                  className="rounded border-slate-300 text-accent focus:ring-accent cursor-pointer w-4 h-4"
                />
                <span>RERA Certified Only</span>
              </label>

              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center space-x-2 border border-slate-200 dark:border-dark-border/50 text-slate-600 dark:text-white hover:text-accent hover:border-accent py-2.5 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer hover:shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listings Count */}
        <div className="text-xs text-slate-500 dark:text-dark-text-muted mb-6">
          Showing <span className="font-bold text-accent">{filteredProperties.length}</span> matching properties
        </div>

        {/* Properties Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 rounded-2xl shadow-md"
            >
              <div className="text-slate-400 mb-4 flex justify-center">
                <Search className="w-12 h-12" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-2">No Properties Found</h3>
              <p className="text-xs text-slate-500 dark:text-dark-text-muted">Try adjusting your filters or resetting the search query.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Properties;
