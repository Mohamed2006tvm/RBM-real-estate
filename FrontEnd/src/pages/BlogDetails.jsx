import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock, Bookmark } from 'lucide-react';
import { blogs } from '../utils/mockData';

const BlogDetails = () => {
  const { id } = useParams();

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="page-container flex flex-col items-center justify-center bg-bg-light dark:bg-dark-bg text-center py-20">
        <h2 className="font-serif text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-sm text-slate-500 mb-8">The news journal or guide you are looking for has been archived.</p>
        <Link to="/blog" className="bg-accent text-primary px-6 py-3 font-semibold uppercase tracking-wider text-xs">
          Back to Journals
        </Link>
      </div>
    );
  }

  // Find related articles (same category, excluding current)
  const relatedArticles = blogs
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center text-xs font-semibold text-slate-500 dark:text-dark-text-muted hover:text-accent mb-6 uppercase tracking-wider transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Journals
        </Link>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Article view */}
          <article className="lg:col-span-2 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 sm:p-10 rounded-sm shadow-sm">
            
            {/* Metadata headers */}
            <div className="space-y-4 mb-6">
              <span className="bg-accent text-primary text-[10px] font-bold px-3 py-1 tracking-wider uppercase rounded-sm inline-block">
                {blog.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-100 dark:border-dark-border/10 pb-6">
                <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1.5 text-accent" /> By {blog.author}</span>
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-accent" /> {blog.date}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-accent" /> {blog.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="h-[380px] overflow-hidden rounded-sm mb-8 border border-slate-100 dark:border-dark-border/20 shadow-sm">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content Body */}
            <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light space-y-6">
              {blog.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

          </article>

          {/* Related Articles Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-24">
            
            {/* Advisor box */}
            <div className="bg-primary dark:bg-dark-bg border border-white/10 p-6 rounded-sm text-center text-white">
              <Bookmark className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider mb-2">Need Professional Counsel?</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-light mb-6">
                Receive private market reports and advice on property valuation from our lead wealth preservation consultants.
              </p>
              <Link
                to="/contact"
                className="w-full bg-accent hover:bg-gold-hover text-primary py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors inline-block cursor-pointer"
              >
                Schedule A Call
              </Link>
            </div>

            {/* Related posts list */}
            {relatedArticles.length > 0 && (
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 rounded-sm shadow-sm">
                <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-50 dark:border-dark-border/10 pb-3">
                  Related Journals
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <div key={rel.id} className="group">
                      <span className="text-[9px] text-accent font-bold uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-slate-700 dark:text-white line-clamp-2 leading-snug group-hover:text-accent transition-colors">
                        <Link to={`/blog/${rel.id}`}>{rel.title}</Link>
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-1">{rel.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogDetails;
