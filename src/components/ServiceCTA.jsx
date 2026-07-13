import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServiceCTA = ({ data }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07070a]">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${data.accentColor}, transparent 70%)`
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-8"
        >
          Ready to Elevate Your Next Event?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform cursor-none group"
          >
            Request a Proposal
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;
