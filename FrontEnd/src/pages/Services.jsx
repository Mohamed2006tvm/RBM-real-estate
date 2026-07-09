import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Landmark, Scale, HeartHandshake, Eye, ShieldCheck,
  TrendingUp, FileText, ArrowUpRight
} from 'lucide-react';

const Services = () => {
  const serviceCards = [
    {
      icon: <ShoppingBag className="w-10 h-10 text-accent" />,
      title: 'Property Buying & Advisory',
      desc: 'Discover certified premier penthouses, beachfront villas, and mansions. We curate bespoke viewing portfolios, check legal clearances, negotiate prices, and manage closing registry processes.',
      benefits: ['Custom viewing portfolios', 'Off-market listings access', 'Price negotiation representation']
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-accent" />,
      title: 'Property Selling & Marketing',
      desc: 'Sell your luxury asset for maximum returns. We employ high-fidelity drone photography, VR walkthroughs, global listing placement, and private outreach to pre-verified qualified high-net-worth buyers.',
      benefits: ['Premium drone & VR marketing', 'Pre-qualified buyer network', 'Targeted international promotion']
    },
    {
      icon: <Landmark className="w-10 h-10 text-accent" />,
      title: 'Commercial Leasing & Suite Management',
      desc: 'Secure corporate spaces, premium retail frontage, or full-zone office skyscrapers. We handle lease terms negotiation, rent indexes, tenant screening, and commercial asset maintenance.',
      benefits: ['Premium corporate suites', 'Tenant screening & background logs', 'LEED-certified advisory']
    },
    {
      icon: <HeartHandshake className="w-10 h-10 text-accent" />,
      title: 'High-Yield Investment Consulting',
      desc: 'Maximize rental yields and capital gains. Our investment consultants evaluate micro-market indicators, RERA developmental milestones, tax planning, and fractional co-investment options.',
      benefits: ['Micro-market yield analysis', 'Fractional holding structures', 'Tax planning and deferrals']
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-accent" />,
      title: 'Tailored Home Loan Support',
      desc: 'Partner with elite financial institutions to secure competitive high-value mortgage interest rates. We facilitate appraisal reports, document processing, and priority banking approvals.',
      benefits: ['Competitive interest rate tie-ups', 'Fast-track bank appraisals', 'End-to-end filing support']
    },
    {
      icon: <Scale className="w-10 h-10 text-accent" />,
      title: 'Legal Registry & Title Clearance',
      desc: 'Ensure total peace of mind. Our in-house legal advisory checks title ownership history, municipal tax logs, occupancy certificate clearances, and manages final registration deeds.',
      benefits: ['Title ownership trace verification', 'Occupancy Certificate audits', 'Escrow management coordination']
    }
  ];

  return (
    <div className="page-container bg-bg-light dark:bg-dark-bg pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16 text-center">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Core Competencies</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-slate-800 dark:text-white">
            Our Professional Services
          </h1>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white dark:bg-dark-card/45 backdrop-blur-md border border-slate-100 dark:border-white/5 p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300 flex flex-col h-full relative hover:-translate-y-1.5"
            >
              {/* Header Icon */}
              <div className="mb-6 bg-accent/10 dark:bg-accent/5 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 dark:text-dark-text-muted text-xs leading-relaxed mb-6 font-light">
                {service.desc}
              </p>

              {/* Benefits Checklist */}
              <ul className="space-y-2 mb-8 text-[11px] text-slate-600 dark:text-dark-text-muted font-light mt-auto">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center">
                    <FileText className="w-3.5 h-3.5 text-accent mr-2 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Link */}
              <Link
                to="/contact"
                className="inline-flex items-center text-xs font-bold text-primary dark:text-accent group-hover:text-accent transition-colors uppercase tracking-wider"
              >
                <span>Schedule Consultation</span>
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
