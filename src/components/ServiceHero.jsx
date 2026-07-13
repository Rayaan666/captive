import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

const ServiceHero = ({ data }) => {
  return (
    <section className="relative pt-32 pb-12 md:pt-48 md:pb-16 overflow-hidden">
      <motion.img
        src={data.image}
        alt={data.heroHeading}
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-[#07070a]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs current={data.heroHeading} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${data.accentColor}, transparent)` }} />
            <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: data.accentColor }}>
              {data.heroLabel}
            </span>
          </div>
          <h1 className="font-display font-black text-white leading-[0.9] tracking-tighter uppercase mb-8" style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)" }}>
            {data.heroHeading}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
            {data.heroDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
