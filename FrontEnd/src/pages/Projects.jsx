import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Building, Calendar, DollarSign } from 'lucide-react';
import { projects } from '../utils/mockData';

const Projects = () => {
  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Premium Gated Communities</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            Exclusive Developments
          </h1>
          <div className="w-12 h-0.5 bg-accent mt-4"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Cover Image & Badges */}
              <div className="relative h-60 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-white text-[10px] font-bold px-3 py-1.5 tracking-wider uppercase rounded-sm border ${
                    project.status === 'Ongoing'
                      ? 'bg-amber-600/90 border-amber-500/30'
                      : 'bg-green-700/90 border-green-600/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* RERA badge overlay */}
                {project.reraCertified && (
                  <div className="absolute bottom-4 right-4 z-10 flex items-center space-x-1 bg-primary/95 text-white text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full shadow-lg border border-accent/30 backdrop-blur-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    <span>RERA CERTIFIED</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Builder Info */}
                <div className="flex items-center text-xs text-slate-500 dark:text-dark-text-muted mb-4">
                  <Building className="w-3.5 h-3.5 mr-1.5 text-accent" />
                  <span>Developer: <span className="font-semibold text-slate-700 dark:text-white">{project.builder}</span></span>
                </div>

                {/* Location & Price grid */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-50 dark:border-dark-border/10 mb-4 text-xs text-slate-600 dark:text-dark-text-muted">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-accent shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center justify-end font-bold text-accent">
                    <DollarSign className="w-4 h-4 mr-0.5" />
                    <span>{project.priceRange}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="w-full bg-slate-50 hover:bg-accent dark:bg-secondary/40 dark:hover:bg-accent text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary text-center py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-slate-200 dark:border-dark-border/20 hover:border-transparent mt-auto"
                >
                  Request Brochure & Pricing
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Projects;
