import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Layers, ChevronRight, Check, X, Building, ShieldCheck } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Compare = () => {
  const { compareList, toggleCompare, clearCompare } = useWishlist();

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Compile all unique amenities across selected properties
  const allAmenities = compareList.reduce((acc, property) => {
    property.amenities.forEach((amenity) => {
      if (!acc.includes(amenity)) acc.push(amenity);
    });
    return acc;
  }, []);

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex justify-between items-baseline mb-12">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Metrics Analysis</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
              Compare Properties
            </h1>
            <div className="w-12 h-0.5 bg-accent mt-4"></div>
          </div>
          
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="flex items-center space-x-2 text-xs font-bold text-red-600 dark:text-red-400 hover:text-accent uppercase tracking-wider cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Comparison Sheet</span>
            </button>
          )}
        </div>

        {compareList.length > 0 ? (
          <div className="overflow-x-auto bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 rounded-sm shadow-md">
            <table className="w-full border-collapse text-left text-xs min-w-[700px]">
              
              {/* Table Header: Property Previews */}
              <thead>
                <tr className="border-b border-slate-100 dark:border-dark-border/10 bg-slate-50/50 dark:bg-secondary/20">
                  <th className="w-1/4 p-6 font-serif text-sm font-bold text-slate-500 uppercase tracking-wider">Features</th>
                  {compareList.map((property) => (
                    <th key={property.id} className="w-1/4 p-6 relative border-l border-slate-100 dark:border-dark-border/10">
                      <button
                        onClick={() => toggleCompare(property)}
                        className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove from Compare"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="space-y-4">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-32 object-cover rounded-sm border border-slate-100 dark:border-dark-border/30 shadow-sm"
                        />
                        <div>
                          <span className="text-[9px] bg-accent text-primary font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block mb-1">
                            {property.type}
                          </span>
                          <h3 className="font-serif text-xs font-bold text-slate-800 dark:text-white line-clamp-1">
                            <Link to={`/properties/${property.id}`} className="hover:text-accent transition-colors">{property.title}</Link>
                          </h3>
                          <span className="text-[10px] text-accent font-bold block mt-1">{formatPrice(property.price)}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty comparison columns */}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <th key={`empty-${idx}`} className="w-1/4 p-6 border-l border-slate-100 dark:border-dark-border/10 text-center text-slate-300 dark:text-dark-border font-light select-none">
                      <div className="flex flex-col items-center justify-center py-12">
                        <Layers className="w-8 h-8 mb-2" />
                        <span className="text-[10px] uppercase tracking-wider">Empty Slot</span>
                        <Link to="/properties" className="text-[9px] text-accent hover:underline uppercase tracking-wide mt-2 block font-bold">Add property</Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body: Specific specs comparison */}
              <tbody>
                {/* 1. Price */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Price</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-50 dark:border-dark-border/10 font-bold text-accent text-sm">
                      {formatPrice(property.price)}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-price-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 2. Location */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Location</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 text-slate-600 dark:text-dark-text-muted font-light">
                      {property.location}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-loc-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 3. Status */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Status</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 font-bold text-slate-700 dark:text-white">
                      {property.status}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-status-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 4. Stage */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Construction Stage</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 text-slate-600 dark:text-dark-text-muted">
                      {property.stage}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-stage-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 5. Area */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Area (Sq Ft)</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 font-bold text-slate-700 dark:text-white">
                      {property.area} sq ft
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-area-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 6. Beds & Baths */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Beds / Baths</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 text-slate-600 dark:text-dark-text-muted">
                      {property.beds > 0 ? `${property.beds} Beds` : 'N/A'} / {property.baths} Baths
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-beds-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 7. Builder Developer */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">Developer</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 text-slate-600 dark:text-dark-text-muted flex items-center space-x-1 py-4">
                      <Building className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{property.builder}</span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-builder-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* 8. RERA Registration */}
                <tr className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                  <td className="p-4 font-semibold text-slate-700 dark:text-white uppercase tracking-wider">RERA ID</td>
                  {compareList.map((property) => (
                    <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10 text-slate-600 dark:text-dark-text-muted py-4">
                      {property.reraId ? (
                        <span className="flex items-center space-x-1 text-[10px] text-green-600 dark:text-green-400 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{property.reraId}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                    <td key={`empty-rera-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                  ))}
                </tr>

                {/* Amenities checklist comparison */}
                <tr>
                  <td className="p-4 font-serif font-bold text-slate-800 dark:text-white uppercase tracking-wider bg-slate-50/50 dark:bg-secondary/10" colSpan={4}>
                    Amenities Comparison
                  </td>
                </tr>

                {allAmenities.map((amenity, idx) => (
                  <tr key={idx} className="border-b border-slate-50 dark:border-dark-border/10 hover:bg-slate-50/30 dark:hover:bg-secondary/10">
                    <td className="p-4 font-medium text-slate-600 dark:text-dark-text-muted">{amenity}</td>
                    {compareList.map((property) => {
                      const hasAmenity = property.amenities.includes(amenity);
                      return (
                        <td key={property.id} className="p-4 border-l border-slate-55 dark:border-dark-border/10">
                          {hasAmenity ? (
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 dark:text-dark-border" />
                          )}
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                      <td key={`empty-amenity-${idx}`} className="p-4 border-l border-slate-55 dark:border-dark-border/10"></td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 rounded-sm shadow-sm max-w-2xl mx-auto">
            <div className="text-slate-300 dark:text-dark-border mb-4 flex justify-center">
              <Layers className="w-16 h-16 text-slate-200 dark:text-secondary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-2">
              No Properties Added to Compare
            </h3>
            <p className="text-xs text-slate-500 dark:text-dark-text-muted max-w-sm mx-auto mb-8 leading-relaxed font-light">
              Add up to three listings to compare price, size, specifications, and luxury amenities side-by-side.
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

export default Compare;
