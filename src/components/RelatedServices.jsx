import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { ArrowUpRight } from "lucide-react";

const RelatedServices = ({ data }) => {
  const relatedSlugs = data.relatedServices || [];
  const related = servicesData.filter(s => relatedSlugs.includes(s.slug));

  if (related.length === 0) return null;

  return (
    <section className="py-24 bg-[#07070a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-6">
            Related Services
          </h2>
          <div className="h-px w-24" style={{ background: `linear-gradient(90deg, ${data.accentColor}, transparent)` }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden h-full cursor-none"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at top right, ${service.accentColor}, transparent)` }}
                  />
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <Icon size={32} style={{ color: service.accentColor }} />
                    <ArrowUpRight size={24} className="text-white/20 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4 relative z-10">
                    {service.heroHeading}
                  </h3>
                  <div 
                    className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out absolute bottom-0 left-0"
                    style={{ background: service.accentColor }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
