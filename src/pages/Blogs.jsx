import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Blogs = () => {
  return (
    <div className="bg-brand-dark min-h-[80vh] flex items-center justify-center relative overflow-hidden py-16 px-4">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      
      {/* Ambient Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 shadow-[0_0_20px_rgba(255,140,0,0.1)] mb-8">
            <Sparkles size={14} className="text-brand-orange animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
              Journal &amp; Insights
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none">
            Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Soon</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto font-light leading-relaxed mb-10">
            We are curating a premium collection of industry expertise, luxury event trends, and brand activation strategies in Dubai &amp; the UAE.
          </p>

          {/* Back Navigation Link */}
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-300 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 group"
          >
            Return to Homepage
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
