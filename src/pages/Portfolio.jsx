import { motion } from 'framer-motion';
import SEO from '../components/SEO';


const Portfolio = () => {
  const portfolioImages = [
    { id: 1, alt: "Futuristic exhibition stand with custom branded merchandise" },
    { id: 2, alt: "Premium event stationery and corporate branding mockup" },
    { id: 3, alt: "Construction of a large luxury exhibition stand with gold accents" },
    { id: 4, alt: "Modern minimalist exhibition stand with wood paneling and lighting" },
    { id: 5, alt: "Large corporate conference with speaker on stage and seated attendees" },
    { id: 6, alt: "Corporate conference setup with wide LED screen and panel seating" },
    { id: 7, alt: "VIP gala dinner setting with elegant table arrangements and ambient lighting" },
    { id: 8, alt: "Outdoor brand activation event with custom structures" },
    { id: 9, alt: "Professional audiovisual equipment setup for a live event" },
    { id: 11, alt: "Luxury yacht corporate event experience" },
    { id: 12, alt: "Creative digital event branding and 3D visualization" }
  ];

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <SEO title="Event Portfolio Dubai | Captive Events" description="Explore Captive Events' portfolio of corporate events, exhibitions, brand activations and event productions showcasing creative planning and execution across Dubai and the UAE." canonical="/portfolio"  />
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
          {portfolioImages.map((image, idx) => (
            <motion.article
              key={image.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5"
            >
              <img
                src={`/portfolio/${image.id}.png`}
                alt={image.alt}
                loading="lazy"
                decoding="async"
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
