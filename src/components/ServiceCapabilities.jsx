import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const ServiceCapabilities = ({ data }) => {
  return (
    <section className="pt-12 pb-16 md:pt-16 bg-[#07070a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-6">
            Key Capabilities
          </h2>
          <div className="h-px w-24" style={{ background: `linear-gradient(90deg, ${data.accentColor}, transparent)` }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.keyCapabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <CheckCircle2 size={24} className="shrink-0 mt-1" style={{ color: data.accentColor }} />
              <span className="text-gray-300 font-medium">{capability}</span>
            </motion.div>
          ))}
        </div>

        {data.supportingServices && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-24 mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-6">
                Supporting Services
              </h2>
              <div className="h-px w-24" style={{ background: `linear-gradient(90deg, ${data.accentColor}, transparent)` }} />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.supportingServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <CheckCircle2 size={24} className="shrink-0 mt-1" style={{ color: data.accentColor }} />
                  <span className="text-gray-300 font-medium">{service}</span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceCapabilities;
