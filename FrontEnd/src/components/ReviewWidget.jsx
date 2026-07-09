import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const ReviewWidget = () => {
  return (
    <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto mb-16">
      
      {/* Aggregate Rating */}
      <div className="flex items-center space-x-4">
        <div className="bg-slate-50 dark:bg-secondary/40 px-5 py-4 rounded-sm border border-slate-200/50 dark:border-dark-border/40 text-center">
          <div className="text-3xl font-extrabold text-slate-800 dark:text-white font-serif">4.9</div>
          <div className="flex text-amber-400 my-1 justify-center">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Out of 5 Stars</div>
        </div>
        <div>
          <div className="flex items-center text-slate-800 dark:text-white font-bold text-sm font-serif">
            <svg className="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.48 1.62l2.42-2.42C17.38 1.75 14.97 1 12.24 1c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.78 0 9.6-4.06 9.6-9.78 0-.66-.06-1.3-.18-1.935H12.24z"/>
            </svg>
            Google Customer Reviews
          </div>
          <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
            Based on 512 verified client reviews. 100% customer satisfaction score.
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-4 md:border-l md:border-slate-100 dark:md:border-dark-border/20 md:pl-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-dark-text-muted">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <div>
            <span className="font-semibold text-slate-700 dark:text-white block">Verified Transactions</span>
            <span className="text-[10px]">Title-cleared listings</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-dark-text-muted">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <div>
            <span className="font-semibold text-slate-700 dark:text-white block">RERA Compliant</span>
            <span className="text-[10px]">Fully accredited brokerage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewWidget;
