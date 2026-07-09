import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  Search, Shield, Gavel, HandCoins, UserCheck,
  MapPin, Home as HomeIcon, DollarSign, ArrowRight,
  TrendingUp, Award, CheckCircle2, MessageCircle, HelpCircle, ChevronDown,
  CheckSquare, HeartHandshake, Compass
} from 'lucide-react';

import { properties, testimonials, faqs } from '../utils/mockData';
import PropertyCard from '../components/PropertyCard';
import ReviewWidget from '../components/ReviewWidget';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const navigate = useNavigate();
  
  // Search Form State
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  
  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  // Why Choose Us Interactive Pillar State
  const [activePillar, setActivePillar] = useState(0);

  // Transaction Process Stepper State
  const [activeStep, setActiveStep] = useState(0);

  // Active Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredProperties = properties.filter(p => p.featured);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/properties', {
      state: { location: searchLocation, type: searchType, budget: searchBudget }
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Real Estate Hero"
            className="w-full h-full object-cover scale-105 animate-[scale-up_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/95 dark:from-dark-bg/95 dark:via-dark-bg/70 dark:to-dark-bg/95"></div>
          {/* Subtle central glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,106,0.18),transparent_60%)] pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Elite Portfolio Real Estate
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight drop-shadow-md"
          >
            Find Your Dream Property <br />
            <span className="gold-gradient filter drop-shadow-sm">With Confidence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light"
          >
            Helping families and institutional investors discover certified luxury residential and commercial properties globally.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <Link
              to="/properties"
              className="bg-gradient-to-r from-accent to-gold-light hover:from-gold-hover hover:to-accent text-primary font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(200,169,106,0.3)] hover:shadow-[0_8px_30px_rgba(200,169,106,0.5)] hover:-translate-y-0.5"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-accent/40 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Consultation
            </Link>
          </motion.div>

          {/* Search Box Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-4xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/15 dark:border-white/10 p-5 sm:p-7 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-white"
          >
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Location Input */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] font-bold text-accent/90 dark:text-accent/90 uppercase tracking-wider mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-4 w-4 h-4 text-accent" />
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="bg-slate-950/45 border border-white/10 dark:border-white/5 text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer transition-all duration-300 hover:bg-slate-950/60"
                  >
                    <option value="" className="bg-slate-900 text-white">All Locations</option>
                    <option value="Manhattan" className="bg-slate-900 text-white">Manhattan, NY</option>
                    <option value="Beverly Hills" className="bg-slate-900 text-white">Beverly Hills, LA</option>
                    <option value="Dubai" className="bg-slate-900 text-white">Palm Jumeirah, Dubai</option>
                    <option value="Miami" className="bg-slate-900 text-white">Miami, FL</option>
                    <option value="London" className="bg-slate-900 text-white">Mayfair, London</option>
                    <option value="Mumbai" className="bg-slate-900 text-white">Bandra, Mumbai</option>
                  </select>
                </div>
              </div>

              {/* Type Select */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] font-bold text-accent/90 dark:text-accent/90 uppercase tracking-wider mb-2">Property Type</label>
                <div className="relative">
                  <HomeIcon className="absolute left-3.5 top-4 w-4 h-4 text-accent" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="bg-slate-950/45 border border-white/10 dark:border-white/5 text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer transition-all duration-300 hover:bg-slate-950/60"
                  >
                    <option value="" className="bg-slate-900 text-white">All Types</option>
                    <option value="Penthouse" className="bg-slate-900 text-white">Penthouse</option>
                    <option value="Villa" className="bg-slate-900 text-white">Villa</option>
                    <option value="Residential" className="bg-slate-900 text-white">Residential Apartment</option>
                    <option value="Commercial" className="bg-slate-900 text-white">Commercial Suite</option>
                  </select>
                </div>
              </div>

              {/* Budget Select */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] font-bold text-accent/90 dark:text-accent/90 uppercase tracking-wider mb-2">Max Budget</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-4 w-4 h-4 text-accent" />
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="bg-slate-950/45 border border-white/10 dark:border-white/5 text-white text-xs w-full py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-accent cursor-pointer transition-all duration-300 hover:bg-slate-950/60"
                  >
                    <option value="" className="bg-slate-900 text-white">No Limit</option>
                    <option value="5000000" className="bg-slate-900 text-white">Up to $5.0M</option>
                    <option value="10000000" className="bg-slate-900 text-white">Up to $10.0M</option>
                    <option value="15000000" className="bg-slate-900 text-white">Up to $15.0M</option>
                    <option value="20000000" className="bg-slate-900 text-white">Up to $20.0M</option>
                    <option value="25000000" className="bg-slate-900 text-white">Up to $25.0M</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-gold-light text-primary hover:from-gold-hover hover:to-accent py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_4px_15px_rgba(200,169,106,0.3)] hover:shadow-[0_6px_25px_rgba(200,169,106,0.5)] cursor-pointer hover:-translate-y-0.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Trust Indicators Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-slate-950/40 backdrop-blur-md py-4.5 z-10 hidden md:block border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex justify-around text-slate-200 text-xs tracking-wider uppercase font-semibold">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-accent mr-2" /> 500+ Happy Families</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-accent mr-2" /> 1000+ Verified Listings</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-accent mr-2" /> 15+ Years Trust Heritage</span>
          </div>
        </div>
      </section>

      {/* 2. TRUST SERVICES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Intro */}
          <div className="lg:col-span-1">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase block mb-3">Private Security & Escrow</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
              Trust Formed On Transparency
            </h2>
            <div className="w-12 h-0.5 bg-accent mt-6 mb-6"></div>
            <p className="text-slate-500 dark:text-dark-text-muted text-sm leading-relaxed font-light mb-8">
              At RBM Realestate, we secure your acquisitions through rigorous structural audits, title verifications, and direct escrow protection.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-gold-hover transition-colors"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Services Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Shield className="w-6 h-6 text-accent" />, title: 'Verified Listings', desc: 'Every penthouse, villa, and corporate floor undergoes RERA and title checks.' },
              { icon: <Gavel className="w-6 h-6 text-accent" />, title: 'Legal Assistance', desc: 'Complete title verification, deed documentation, and registry support by in-house counsel.' },
              { icon: <HandCoins className="w-6 h-6 text-accent" />, title: 'Loan Support', desc: 'Secure competitive interest rate mortgages directly via our partner banking channels.' },
              { icon: <CheckSquare className="w-6 h-6 text-accent" />, title: 'Property Inspection', desc: 'Rigorous engineering, structural audit, and design compliance reports on all properties.' },
              { icon: <UserCheck className="w-6 h-6 text-accent" />, title: 'Dedicated Manager', desc: 'A singular point of contact handling viewing schedules, negotiations, and closing support.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300 relative flex gap-4 ${idx === 4 ? 'sm:col-span-2' : ''}`}
              >
                <div className="flex-shrink-0 bg-accent/10 dark:bg-accent/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-2 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 dark:text-dark-text-muted text-[11px] leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-secondary/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Curated Portfolios</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">
                Featured Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-primary dark:text-accent font-bold hover:text-accent dark:hover:text-white transition-colors flex items-center space-x-2 text-xs uppercase tracking-wider mt-4 md:mt-0"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {featuredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-dark-border/10">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Why Choose RBM Real Estate</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">
            Unrivaled Quality, Uncompromising Standards
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Interactive Selector List (width: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {[
              {
                icon: <Shield className="w-5 h-5 text-accent" />,
                title: '100% Verified Listings',
                desc: 'Zero title risk. Every property includes fully vetted documentation, municipal approvals, and RERA registration logs.',
                metric: '12,000+',
                metricLabel: 'Vetted Title Deeds',
                subtext: 'We partner directly with municipal regulators to perform title verification on every single luxury listing.',
                image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
                tag: 'Zero Risk'
              },
              {
                icon: <Compass className="w-5 h-5 text-accent" />,
                title: 'Expert Guidance',
                desc: 'Receive insights from seasoned private brokers who understand high-yield sub-markets and long-term asset value.',
                metric: '15+ Yrs',
                metricLabel: 'Average Advisor Experience',
                subtext: 'Our advisory desks are staffed exclusively by Senior Partners with a minimum of 15 years in private client real estate.',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
                tag: 'Elite Advisory'
              },
              {
                icon: <DollarSign className="w-5 h-5 text-accent" />,
                title: 'Best Pricing Assurance',
                desc: 'Direct developer partnerships and institutional relationships ensure you buy at first-tier base valuations.',
                metric: '-12%',
                metricLabel: 'Average Below Market',
                subtext: 'We secure allocation slots at base developer rates, bypassing intermediate broker premiums for our clients.',
                image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
                tag: 'Direct Pricing'
              },
              {
                icon: <Gavel className="w-5 h-5 text-accent" />,
                title: 'Legal Support',
                desc: 'Complimentary deed evaluation, lien clearances, municipal paperwork filings, and absolute register audits.',
                metric: '100%',
                metricLabel: 'Compliance Record',
                subtext: 'Our in-house legal counsel handles title trace logs, escrow clearances, and registration stamp compliance.',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
                tag: 'In-House Counsel'
              },
              {
                icon: <HeartHandshake className="w-5 h-5 text-accent" />,
                title: 'After Sales Service',
                desc: 'Seamless handover checkouts, utility account linkages, designer vendor introductions, and property lease management.',
                metric: '4.9/5',
                metricLabel: 'Client Satisfaction Rating',
                subtext: 'From utility transitions to onboarding elite interior architects, our client support is indefinite.',
                image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
                tag: 'Indefinite Support'
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-accent" />,
                title: 'Investment Advisory',
                desc: 'Evaluate capital appreciation curves, occupancy rates, and fractional holding yields through detailed research reports.',
                metric: '8.4%',
                metricLabel: 'Average Net Rental Yield',
                subtext: 'We leverage micro-market census and predictive analytics to forecast rental growth and developmental timelines.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                tag: 'Data-Driven Yields'
              }
            ].map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  onMouseEnter={() => setActivePillar(idx)}
                  className={`group cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                    isActive
                      ? 'bg-white dark:bg-slate-900/60 border-accent/60 shadow-[0_4px_20px_rgba(200,169,106,0.15)] translate-x-2'
                      : 'bg-transparent border-transparent hover:border-slate-200 dark:hover:border-white/5 hover:translate-x-1'
                  }`}
                >
                  {/* Number Badge */}
                  <span className={`text-[10px] font-bold font-mono transition-colors duration-300 mt-0.5 ${
                    isActive ? 'text-accent' : 'text-slate-400 dark:text-dark-text-muted/60'
                  }`}>
                    0{idx + 1}
                  </span>

                  {/* Icon */}
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-accent/10 text-accent scale-110' : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-accent'
                  }`}>
                    {pillar.icon}
                  </div>

                  <div className="flex-grow">
                    <h3 className={`font-serif text-xs font-bold transition-colors duration-300 ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-dark-text-muted'
                    }`}>
                      {pillar.title}
                    </h3>
                    
                    {/* Expandable Description */}
                    <div className={`grid transition-all duration-300 ease-in-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                    }`}>
                      <div className="overflow-hidden">
                        <p className="text-slate-500 dark:text-dark-text-muted text-[10px] leading-relaxed font-light">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase Frame (width: 7 cols) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full relative rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl bg-slate-950 flex flex-col justify-end min-h-[400px] lg:min-h-full">
              {/* Animated Background Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={[
                      { image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80' },
                      { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
                      { image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80' },
                      { image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' },
                      { image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' },
                      { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' }
                    ][activePillar].image}
                    alt="Active Pillar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive Showcase Content overlay */}
              <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between h-full w-full gap-8">
                {/* Top: Pill Tag */}
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase py-1.5 px-3 rounded-full bg-accent/20 text-accent border border-accent/20 backdrop-blur-md">
                    {[
                      'Zero Risk',
                      'Elite Advisory',
                      'Direct Pricing',
                      'In-House Counsel',
                      'Indefinite Support',
                      'Data-Driven Yields'
                    ][activePillar]}
                  </span>
                  
                  {/* Accent design detail */}
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom content and stats */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                        {[
                          '100% Verified Listings',
                          'Expert Guidance',
                          'Best Pricing Assurance',
                          'Legal Support',
                          'After Sales Service',
                          'Investment Advisory'
                        ][activePillar]}
                      </h3>
                      
                      <p className="text-slate-300 text-xs leading-relaxed font-light max-w-lg">
                        {[
                          'We partner directly with municipal regulators to perform title verification on every single luxury listing.',
                          'Our advisory desks are staffed exclusively by Senior Partners with a minimum of 15 years in private client real estate.',
                          'We secure allocation slots at base developer rates, bypassing intermediate broker premiums for our clients.',
                          'Our in-house legal counsel handles title trace logs, escrow clearances, and registration stamp compliance.',
                          'From utility transitions to onboarding elite interior architects, our client support is indefinite.',
                          'We leverage micro-market census and predictive analytics to forecast rental growth and developmental timelines.'
                        ][activePillar]}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Horizontal Divider */}
                  <div className="w-full h-px bg-white/10"></div>

                  {/* Dynamic Metric display */}
                  <div className="flex items-center gap-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePillar}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl sm:text-4xl font-serif font-extrabold text-accent leading-none"
                      >
                        {[
                          '12,000+',
                          '15+ Yrs',
                          '-12%',
                          '100%',
                          '4.9/5',
                          '8.4%'
                        ][activePillar]}
                      </motion.div>
                    </AnimatePresence>
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activePillar}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-[10px] text-slate-400 dark:text-dark-text-muted uppercase tracking-wider font-semibold"
                        >
                          {[
                            'Vetted Title Deeds',
                            'Average Advisor Experience',
                            'Average Below Market',
                            'Compliance Record',
                            'Client Satisfaction Rating',
                            'Average Net Rental Yield'
                          ][activePillar]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSACTION PROCESS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-dark-border/10">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Simple Covenants</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">
            Our Seamless Process
          </h2>
          <p className="text-slate-500 dark:text-dark-text-muted text-xs max-w-md mx-auto mt-2 leading-relaxed font-light">
            We simplify complex acquisitions into six clear milestone steps to register your dream real estate.
          </p>
        </div>

        {/* Interactive Steps Navigation Tracker */}
        <div className="relative mb-12 max-w-4xl mx-auto px-4">
          {/* Timeline Connector Line */}
          <div className="absolute top-[22px] left-[8%] right-[8%] h-0.5 bg-slate-200 dark:bg-dark-border/40 z-0">
            {/* Filled Progress Indicator based on activeStep */}
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / 5) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            {[
              { step: '01', title: 'Consultation' },
              { step: '02', title: 'Selection' },
              { step: '03', title: 'Site Visits' },
              { step: '04', title: 'Documentation' },
              { step: '05', title: 'Registration' },
              { step: '06', title: 'Move In' }
            ].map((stepObj, idx) => {
              const isSelected = activeStep === idx;
              const isPassed = idx < activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center focus:outline-none group cursor-pointer"
                >
                  {/* Step Circle indicator */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border font-mono text-xs font-bold transition-all duration-300 ${
                    isSelected
                      ? 'bg-accent text-primary border-accent scale-110 shadow-[0_0_15px_rgba(200,169,106,0.4)]'
                      : isPassed
                      ? 'bg-slate-900 text-accent border-accent'
                      : 'bg-white dark:bg-slate-950 text-slate-400 dark:text-dark-text-muted/60 border-slate-200 dark:border-dark-border/40 group-hover:border-slate-400 dark:group-hover:border-dark-border'
                  }`}>
                    {stepObj.step}
                  </div>
                  
                  {/* Step Label (Hidden on small screens) */}
                  <span className={`hidden md:block text-[10px] uppercase font-bold tracking-wider mt-3 transition-colors duration-300 ${
                    isSelected ? 'text-accent' : 'text-slate-500 dark:text-dark-text-muted/60 group-hover:text-slate-700 dark:group-hover:text-dark-text'
                  }`}>
                    {stepObj.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Card for Active Step */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 p-8 sm:p-10 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side: Step Visuals (width: 5 cols) */}
              <div className="md:col-span-5 relative h-64 md:h-80 rounded-xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-md">
                <img
                  src={[
                    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
                  ][activeStep]}
                  alt="Step Visual"
                  className="w-full h-full object-cover"
                />
                {/* Floating Index Tag */}
                <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-accent font-serif text-lg font-bold w-12 h-12 rounded-full flex items-center justify-center border border-accent/25">
                  {[
                    '01', '02', '03', '04', '05', '06'
                  ][activeStep]}
                </div>
              </div>

              {/* Right Side: Step Descriptions & Checklists (width: 7 cols) */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.25em]">
                    {[
                      'Define Your Objectives',
                      'Curate Premium Portfolios',
                      'Immersive Property Tours',
                      'Verify Legal Clearances',
                      'Finalize Registry & Escrow',
                      'Handover & Integration'
                    ][activeStep]}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mt-1">
                    Step {[
                      '01', '02', '03', '04', '05', '06'
                    ][activeStep]}: {[
                      'Consultation', 'Selection', 'Site Visits', 'Documentation', 'Registration', 'Move In'
                    ][activeStep]}
                  </h3>
                </div>

                <p className="text-slate-500 dark:text-dark-text-muted text-xs sm:text-sm leading-relaxed font-light">
                  {[
                    'We start by aligning on your financial parameters, architectural preferences, and portfolio objectives to establish a tailored search criteria.',
                    'Our brokers scour the market, utilizing private client channels to secure priority access to matching off-market and pre-launch luxury listings.',
                    'Experience your selected properties via private guided tours, chauffeured viewings, or ultra-high-fidelity VR walk-throughs.',
                    'Our in-house legal desk audits municipal logs, traces title histories, and coordinates drafting contract deeds for complete security.',
                    'We manage escrow operations and mortgage clearances, guiding you through registry and property title transfers.',
                    'Receive the keys to your new estate. Our after-sales desk will onboard utility records and introduce elite design vendors.'
                  ][activeStep]}
                </p>

                {/* Sub-steps Checklist */}
                <ul className="space-y-3.5 pt-2">
                  {[
                    [
                      'Establish investment goals & target budget',
                      'Determine preferred sub-markets & location metrics',
                      'Outline required property criteria & timelines'
                    ],
                    [
                      'Filter listings matching RERA & title safety profiles',
                      'Gain priority access to off-market inventory',
                      'Deliver a curated digital properties binder'
                    ],
                    [
                      'Private chauffeur-driven site viewing tours',
                      'Immersive live VR walkthroughs for remote clients',
                      'Perform structural audit and materials inspection'
                    ],
                    [
                      'Conduct full title search & ownership logs validation',
                      'Verify Occupancy Certificate (OC) & RERA compliance',
                      'Draft legal Sales Agreement deeds'
                    ],
                    [
                      'Coordinate secure client escrow accounts',
                      'Facilitate competitive high-value bank mortgages',
                      'Represent client at local registrar office sign-off'
                    ],
                    [
                      'Physical keys delivery & handover checklist sign-off',
                      'Initiate water, gas, electricity utility transfers',
                      'Connect with pre-vetted interior designer partners'
                    ]
                  ][activeStep].map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start">
                      <div className="mt-0.5 bg-accent/15 text-accent p-1 rounded-full mr-3 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-light">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800/60 py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,106,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Acquire Today</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Ready to Own Your <span className="gold-gradient">Dream Property?</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-10 leading-relaxed font-light">
            Book a free private advisory session. Let our experts craft a real estate investment portfolio tailored to your family's future.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-accent to-gold-light hover:from-gold-hover hover:to-accent text-primary font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(200,169,106,0.3)] hover:shadow-[0_8px_30px_rgba(200,169,106,0.5)] hover:-translate-y-0.5 cursor-pointer inline-block"
          >
            Schedule a Meeting
          </Link>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-dark-border/10">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Trust Verified</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">
            Client Testimonials
          </h2>
          <p className="text-slate-500 dark:text-dark-text-muted text-xs max-w-md mx-auto mt-2 leading-relaxed font-light">
            Read verified experiences from high-net-worth investors and families who registered their dream real estate with us.
          </p>
        </div>

        {/* Split Interactive Testimonial Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Left Column: Investor Registry Navigation Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="text-xs font-bold text-accent uppercase tracking-widest pl-2 mb-2">
              Investor Registry
            </div>
            {testimonials.map((t, idx) => {
              const isActive = activeTestimonial === idx;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-white dark:bg-dark-card border-accent shadow-[0_8px_30px_rgba(200,169,106,0.12)] dark:shadow-[0_8px_30px_rgba(200,169,106,0.08)]'
                      : 'bg-white/50 dark:bg-dark-card/20 border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-white dark:hover:bg-dark-card/35'
                  }`}
                >
                  {/* Left Side Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className={`w-12 h-12 rounded-xl object-cover border transition-all duration-300 ${
                        isActive ? 'border-accent scale-105 shadow-md' : 'border-slate-200 dark:border-white/10'
                      }`}
                    />
                    <div>
                      <h4 className={`font-serif text-sm font-bold transition-colors ${
                        isActive ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {t.name}
                      </h4>
                      <span className="text-[10px] text-accent tracking-wider font-medium uppercase">
                        {[
                          'Bel Air Estate',
                          'Manhattan Penthouse',
                          'Miami Corporate Suite'
                        ][idx]}
                      </span>
                    </div>
                  </div>

                  {/* Right Side Status */}
                  <div className="text-right shrink-0 flex flex-col items-end">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 fill-accent text-accent"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-slate-400 dark:text-dark-text-muted/60 uppercase">
                      {[
                        'Verified Deed',
                        'Escrow Certified',
                        'Registry Verified'
                      ][idx]}
                    </span>
                  </div>

                  {/* Active highlight line indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Cinematic Spotlight Showcase Deck (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-dark-card/45 backdrop-blur-lg border border-slate-100 dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]"
              >
                {/* Floating gold quotation watermark */}
                <div className="absolute -top-4 -right-2 text-accent/5 dark:text-accent/[0.03] text-[180px] font-serif select-none pointer-events-none font-bold leading-none">
                  “
                </div>

                {/* Testimonial Quote text */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 text-accent text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                    <UserCheck className="w-4 h-4" />
                    <span>Verified Investor Spotlight</span>
                  </div>
                  <p className="font-serif text-base sm:text-xl italic text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                    "{testimonials[activeTestimonial].comment}"
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 dark:border-white/5 my-6"></div>

                {/* Footer Signature Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4 sm:gap-0">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm tracking-wide uppercase">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <span className="text-xs text-slate-400 dark:text-dark-text-muted font-light">
                      {testimonials[activeTestimonial].role}
                    </span>
                  </div>

                  {/* Cursive Handwriting Signature Block */}
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-dark-text-muted/60 uppercase block">
                      Certified Signature
                    </span>
                    <span className="font-signature text-3xl text-accent/80 select-none block tracking-wide mt-1">
                      {testimonials[activeTestimonial].name}
                    </span>
                  </div>
                </div>

                {/* Verifiable Contract registry hash block */}
                <div className="mt-6 pt-3 border-t border-slate-50 dark:border-white/[0.02] flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-dark-text-muted/50">
                  <span>REGISTRY RECORD: ACTIVE</span>
                  <span>DEED HASH: 0x89A{activeTestimonial}F...382C</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Trustpilot / Google Aggregate Widget */}
        <ReviewWidget />
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Resolve Queries</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">
            Common Customer Questions
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/20"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-6 text-left text-slate-800 dark:text-white font-serif font-bold text-xs sm:text-sm uppercase tracking-wide focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-50 dark:border-dark-border/10"
                    >
                      <div className="p-6 text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
