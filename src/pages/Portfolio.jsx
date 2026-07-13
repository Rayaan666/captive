import { motion } from 'framer-motion';

const Portfolio = () => {
  const portfolioImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12];

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-9xl font-display font-black leading-none uppercase tracking-tighter"
        >
          Selected <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Works.</span>
        </motion.h1>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {portfolioImages.map((imageNumber, idx) => (
            <motion.article
              key={imageNumber}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5"
            >
              <img
                src={`/portfolio/${imageNumber}.png`}
                alt={`Captive Events portfolio ${imageNumber}`}
                className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
