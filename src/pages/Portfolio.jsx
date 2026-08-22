import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { portfolioData, portfolioCategories } from '../data/portfolioData';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? portfolioData
    : portfolioData.filter(project => project.category === activeCategory);

  return (
    <div className="bg-brand-dark pt-32 pb-24 min-h-screen">
      <SEO title="Event Portfolio Dubai | Captive Events" description="Explore Captive Events' portfolio of corporate events, exhibitions, brand activations and event productions showcasing creative planning and execution across Dubai and the UAE." canonical="/portfolio"  />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-display font-black leading-none uppercase tracking-tighter mb-12"
        >
          Selected <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Works.</span>
        </motion.h1>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Portfolio Categories"
        >
          {portfolioCategories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="portfolio-grid"
              onClick={() => setActiveCategory(category)}
              className={`relative flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark ${
                activeCategory === category
                  ? "text-white"
                  : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-brand-red to-brand-orange rounded-full -z-10 shadow-[0_0_20px_rgba(255,91,31,0.4)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="portfolio-grid" aria-live="polite">
        {filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: idx * 0.05 }}
                  className="group relative overflow-hidden rounded-3xl bg-[#0a0a0f] border border-white/5 shadow-2xl focus-within:ring-2 focus-within:ring-brand-orange"
                >
                  {/* Card Aspect Ratio Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 transition-opacity duration-500 md:group-hover:opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/20 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 mix-blend-overlay" />

                    {/* Gradient Border Glow on Hover */}
                    <div className="absolute inset-0 border-2 border-transparent md:group-hover:border-white/10 rounded-3xl transition-colors duration-500 z-20 pointer-events-none" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                      {/* Category Badge */}
                      <div className="mb-auto self-start">
                        <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-brand-orange border border-white/10 shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      <div className="transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight">
                          {project.title}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4 opacity-100 md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
                          {project.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} className="text-brand-orange" />
                              {project.location}
                            </span>
                          )}
                          {project.year && (
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-brand-orange" />
                              {project.year}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-400 line-clamp-2 mb-6 opacity-100 md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
                          {project.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-orange md:group-hover:text-white transition-colors duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                          <span>View Details</span>
                          <span className="p-1.5 rounded-full bg-brand-orange/20 md:group-hover:bg-brand-orange transition-colors duration-300">
                            <ArrowUpRight size={14} className="text-brand-orange md:group-hover:text-white" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center border border-white/5 rounded-3xl bg-white/[0.02]"
          >
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">No projects available in this category yet.</h3>
            <p className="text-gray-400 font-light">Explore our other event experiences.</p>
            <button 
              onClick={() => setActiveCategory("All")}
              className="mt-8 px-8 py-3 rounded-full bg-brand-orange text-white text-sm font-bold uppercase tracking-widest hover:bg-brand-red transition-colors"
            >
              View All Projects
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
