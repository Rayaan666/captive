import { motion } from "framer-motion";

const ServiceProcess = ({ data }) => {
  return (
    <section className="pt-12 pb-16 md:pt-16 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-6">
            Our Process
          </h2>
          <div className="h-px w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${data.accentColor}, transparent)` }} />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {data.process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6 md:gap-8 mb-8 last:mb-0 relative"
            >
              {index !== data.process.length - 1 && (
                <div 
                  className="absolute left-8 top-16 bottom-[-32px] w-px opacity-30" 
                  style={{ background: data.accentColor }}
                />
              )}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 font-display font-black text-2xl z-10"
                style={{ 
                  color: data.accentColor,
                  border: `1px solid ${data.accentColor}40`,
                  background: `#050505`,
                  boxShadow: `0 0 20px ${data.accentColor}20`
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white">{step}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
