import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Eye, ShieldCheck, Heart } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime || 1);

    return () => clearInterval(timer);
  }, [value, duration]);

  const suffix = value.replace(/[0-9]/g, '');
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const stats = [
    { value: '1200+', label: 'Premium Homes Sold' },
    { value: '550+', label: 'Discerning Clients' },
    { value: '15+', label: 'Years Luxury Heritage' },
    { value: '8+', label: 'Global Cities Covered' }
  ];

  const awards = [
    { title: 'Best Luxury Brokerage', organization: 'International Property Awards 2024', year: '2024' },
    { title: 'Excellence in Client Advising', organization: 'Real Estate Congress', year: '2025' },
    { title: 'Premier RERA Accredited Partner', organization: 'Regulatory Authority Council', year: '2023' }
  ];

  const partners = [
    'RBM Developments', 'Elite Living Spaces', 'Apex Heights Corp',
    'Vanguard Luxury Group', 'Grosvenor Estates Ltd', 'Monolith Builders'
  ];

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Who We Are</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            Brand Heritage & Vision
          </h1>
          <div className="w-12 h-0.5 bg-accent mt-4"></div>
        </div>

        {/* Narrative Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[480px] overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
              alt="Luxury Estate Boardroom"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="space-y-6">
            <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center">
              <Award className="w-4 h-4 mr-2" /> Established 2011
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
              Curating Portfolios For Multi-Generational Wealth
            </h2>
            <p className="text-slate-500 dark:text-dark-text-muted text-xs sm:text-sm leading-relaxed font-light">
              At RBM Real Estate, we believe that purchasing a premium residence is not merely a transaction—it is the creation of a private legacy. Founded in 2011, we have built a reputation on absolute discretion, transparency, and comprehensive asset verification.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center">
                  <Compass className="w-4 h-4 text-accent mr-2" /> Our Mission
                </h3>
                <p className="text-slate-500 dark:text-dark-text-muted text-[11px] leading-relaxed font-light">
                  To provide our clients with legally certified, architectural masterpieces while managing asset negotiation and closing procedures under complete confidentiality.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center">
                  <Eye className="w-4 h-4 text-accent mr-2" /> Our Vision
                </h3>
                <p className="text-slate-500 dark:text-dark-text-muted text-[11px] leading-relaxed font-light">
                  To remain the premier destination for international investors seeking to acquire high-value property portfolios across top-tier global cities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 p-8 rounded-2xl shadow-sm mb-20 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-accent font-serif">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[10px] text-slate-400 dark:text-dark-text-muted uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Awards and Accolades */}
        <div className="mb-20">
          <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-100 dark:border-dark-border/10 pb-4">
            Awards & Accolades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-accent mb-4"><Award className="w-8 h-8" /></div>
                  <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                    {award.title}
                  </h3>
                  <p className="text-slate-500 dark:text-dark-text-muted text-xs font-light">
                    {award.organization}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 mt-4 block font-bold">{award.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Builder Partners Logos */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-100 dark:border-dark-border/10 pb-4 text-center">
            Accredited Development Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-secondary/40 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl text-center font-serif text-[11px] font-bold text-slate-400 dark:text-dark-text-muted uppercase tracking-widest hover:text-accent dark:hover:text-accent hover:border-accent/20 transition-all duration-300 shadow-sm"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
