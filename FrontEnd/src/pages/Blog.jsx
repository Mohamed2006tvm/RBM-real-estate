import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { blogs } from '../utils/mockData';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Investment Advice', 'Buying Guide', 'Real Estate Tips'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Market Intelligence</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            Real Estate Journals
          </h1>
          <div className="w-12 h-0.5 bg-accent mt-4"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-100 dark:border-dark-border/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-accent border-accent text-primary'
                  : 'bg-white dark:bg-dark-card border-slate-200 dark:border-dark-border/30 text-slate-600 dark:text-dark-text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 rounded-sm overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Featured Image */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary/90 text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-sm border border-accent/20">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 mb-3">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {blog.date}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {blog.readTime}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 leading-snug hover:text-accent transition-colors">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed mb-6 line-clamp-2 font-light">
                    {blog.excerpt}
                  </p>

                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center text-xs font-bold text-primary dark:text-accent mt-auto uppercase tracking-wider group-hover:text-accent"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Blog;
