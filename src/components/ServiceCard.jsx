import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="glass p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors duration-300">
        <Icon className="text-brand-teal group-hover:text-brand-orange transition-colors duration-300" size={32} />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
