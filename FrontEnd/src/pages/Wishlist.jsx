import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ChevronRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import PropertyCard from '../components/PropertyCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Saved Portfolio</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            My Wishlist
          </h1>
          <div className="w-12 h-0.5 bg-accent mt-4"></div>
        </div>

        {/* Wishlist Listings */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 rounded-sm shadow-sm max-w-2xl mx-auto">
            <div className="text-slate-300 dark:text-dark-border mb-4 flex justify-center">
              <Heart className="w-16 h-16 fill-current text-slate-200 dark:text-secondary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-slate-500 dark:text-dark-text-muted max-w-sm mx-auto mb-8 leading-relaxed font-light">
              Bookmark your favorite penthouses, villas, and commercial spaces to track updates and schedule visits.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center bg-accent hover:bg-gold-hover text-primary font-bold px-6 py-3 text-xs uppercase tracking-wider transition-colors rounded-sm"
            >
              <span>Browse Properties</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
