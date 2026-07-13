import { Fragment } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import SpotlightCard from '../components/SpotlightCard';

const testimonials = [
  {
    quote: "Captive Events transformed our exhibition presence. The stand design was absolutely stunning and drew a massive crowd.",
    author: "Sarah Jenkins",
    role: "Marketing Director",
    company: "TechCorp"
  },
  {
    quote: "Their B2B event execution is flawless. From logistics to guest experience, everything was handled to perfection.",
    author: "Marcus Vance",
    role: "COO",
    company: "Innovate Group"
  },
  {
    quote: "Exceptional service! The digital branding and Stand Fabrication exceeded our expectations. Truly a premium team.",
    author: "Elena Rostova",
    role: "Brand Manager",
    company: "Luxora"
  },
  {
    quote: "The attention to detail and creative execution of our brand activation stand was phenomenal. Looking forward to our next collaboration!",
    author: "Dev Patel",
    role: "Event Lead",
    company: "Apex Media"
  },
  {
    quote: "Professional, innovative, and highly efficient. They made our annual summit a roaring success.",
    author: "Chloe Dupont",
    role: "VP of Operations",
    company: "Global Solutions"
  }
];

const Home = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <div className="bg-brand-dark">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        aria-labelledby="home-hero-title"
      >
        {/* Photographic Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-event-bg.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-brand-dark"></div>
        </div>

        {/* Dynamic Light Wash */}
        <div className="absolute inset-0 z-0 opacity-35">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] bg-brand-red/30 rounded-full blur-[120px] mix-blend-screen"
          ></motion.div>
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-screen"
          ></motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-teal/10 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        </div>

        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <p className="mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">
              Luxury Event Planning & Production
            </p>
            <h1
              id="home-hero-title"
              className="text-[8vw] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.9] font-display font-black tracking-tighter uppercase drop-shadow-2xl"
            >
              <span className="block text-white">Captive</span>
              <span className="block text-outline text-outline-hover">Events</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium tracking-wide"
          >
            Captive Events is Dubai's premier bespoke event management company delivering corporate events, exhibitions, brand activations, gala dinners, roadshows, and luxury experiences with innovative planning, seamless production, and exceptional execution across UAE.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs md:text-sm text-gray-200"
            aria-label="Captive Events services"
          >
            {[
              'Corporate Events',
              'Exhibitions & Expo Stands',
              'Brand Activations',
              'Roadshows',
              'Gala Dinners',
              'Luxury Nautical Experiences'
            ].map((service) => (
              <li key={service} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
                {service}
              </li>
            ))}
          </motion.ul>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/contact" className="w-full sm:w-auto group relative inline-flex items-center justify-center cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] blur-xl opacity-30 transition-all duration-700"></div>
              
              <div
                className="relative px-10 py-5 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] rounded-full overflow-hidden flex items-center justify-center gap-3 shadow-2xl w-full sm:w-auto"
              >
                <span className="relative z-10 text-white font-bold tracking-wide uppercase text-sm drop-shadow-md">Start Planning</span>
                <ArrowRight size={20} className="relative z-10 text-white drop-shadow-md" />
              </div>
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto">
              <MagneticButton variant="outline" className="text-base w-full sm:w-auto px-8 py-4 flex items-center space-x-2">
                <Play size={18} className="fill-current" />
                <span>Showreel</span>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="pt-6 pb-12 relative z-10 overflow-hidden">
        {/* Background glow for the whole section */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
          <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-radial from-brand-dark via-brand-dark/90 to-transparent blur-3xl opacity-80 mix-blend-multiply"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Side: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange mb-4 inline-block drop-shadow-md ml-2">
                WHO WE ARE
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white mb-4 leading-[1.1]">
                Creating Experiences <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">That Captivate</span>
              </h2>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-medium ml-2">
                <p>
                  Captive Events is a bespoke event management company dedicated to crafting extraordinary experiences that leave lasting impressions.
                </p>
                <p>
                  With over 30 years of expertise, we specialize in corporate events, exhibitions, brand activations, luxury experiences, gala dinners, roadshows, and high-impact event productions.
                </p>
                <p>
                  Our client-centric philosophy, creative storytelling approach, and flawless execution allow us to transform ideas into immersive experiences that captivate audiences and elevate brands.
                </p>
                <div className="pt-6 border-t border-white/10 mt-8">
                  <p className="text-xl text-white font-display font-bold italic tracking-wide">
                    We don't simply organize events. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange mt-2 inline-block not-italic text-2xl">We create moments people remember.</span>
                  </p>
                </div>
              </div>

              {/* Premium CTA Button */}
              <Link to="/about" className="group relative inline-flex items-center justify-center mt-12 cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] blur-xl opacity-40 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700"></div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-10 py-5 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] rounded-full overflow-hidden flex items-center gap-3 shadow-2xl"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
                  
                  <span className="relative z-10 text-white font-bold tracking-wide uppercase text-sm drop-shadow-md">Discover Our Story</span>
                  <ArrowRight size={20} className="relative z-10 text-white group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Right Side: Visuals */}
            <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center perspective-1000">
              {/* Background radial glow */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.15)_0%,transparent_70%)] rounded-full blur-[50px]"
              ></motion.div>

              {/* Animated Hummingbird Trails SVG */}
              <svg viewBox="0 0 500 500" className="absolute inset-0 z-10 w-full h-full opacity-60 pointer-events-none drop-shadow-[0_0_15px_rgba(255,140,0,0.8)] mix-blend-screen">
                <motion.path
                  d="M100 400 C 200 500, 400 300, 250 150 C 150 0, 450 50, 450 350 C 450 500, 150 250, 200 200"
                  fill="transparent"
                  stroke="url(#gradient-hummingbird)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.path
                  d="M50 250 C 100 100, 300 100, 400 250 C 500 400, 200 500, 150 350"
                  fill="transparent"
                  stroke="url(#gradient-hummingbird)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
                <defs>
                  <linearGradient id="gradient-hummingbird" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff3b3b" />
                    <stop offset="50%" stopColor="#ff8c00" />
                    <stop offset="100%" stopColor="#ffcc00" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Cards / Abstract Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 0.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[85%] h-[80%] rounded-3xl overflow-hidden glass border border-white/10 p-3 shadow-[0_40px_80px_rgba(0,0,0,0.6)] group z-20 backdrop-blur-md"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-brand-dark">
                  {/* Dynamic gradient overlay that fades on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-60"></div>
                  
                  {/* Camera bracket styling */}
                  <div className="absolute inset-4 z-20 pointer-events-none border border-white/5 rounded-xl transition-all duration-500 group-hover:inset-6">
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-brand-orange/60"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-brand-orange/60"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-brand-orange/60"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-brand-orange/60"></div>
                  </div>

                  <img 
                    src="/whoweare.png" 
                    alt="About Captive Events" 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                  />

                  {/* Luxury Float Badge inside the image */}
                  <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start max-w-[80%]">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-bold tracking-[0.2em] text-brand-orange uppercase mb-3 inline-block shadow-md">
                      Est. 1996
                    </span>
                    <h3 className="text-white font-display font-black text-xl md:text-2xl uppercase tracking-wide drop-shadow-md leading-tight">
                      Bespoke Luxury <br />
                      <span className="text-brand-orange">Event Productions</span>
                    </h3>
                  </div>
                  
                  {/* Floating tech badge at top-right */}
                  <div className="absolute top-6 right-6 z-20 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/15 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                    <span className="text-[9px] font-bold text-gray-200 tracking-wider uppercase">Premium Standards</span>
                  </div>
                </div>

                {/* Outer glowing border outline */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-brand-red via-brand-orange to-brand-yellow opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-700 pointer-events-none"></div>
              </motion.div>
              
              {/* Floating Orbs */}
              <motion.div
                animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-brand-orange shadow-[0_0_20px_rgba(255,140,0,0.8)] z-40"
              ></motion.div>
              <motion.div
                animate={{ y: [0, 40, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-brand-red shadow-[0_0_15px_rgba(255,59,59,0.8)] z-40"
              ></motion.div>
            </div>
          </div>
          
          {/* Bottom Highlight Cards */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "30+ Years", desc: "Event Management Excellence" },
              { title: "Client-Centric", desc: "Tailored Experiences For Every Brand" },
              { title: "Bespoke Solutions", desc: "From Concept To Execution" }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 hover:bg-white/[0.04] transition-all duration-300 group text-center"
              >
                <h4 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-red group-hover:to-brand-orange transition-colors duration-300">
                  {card.title}
                </h4>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-widest group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-red group-hover:to-brand-orange transition-colors duration-300">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="py-6 border-y border-white/5 bg-white/[0.02] overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex space-x-12 items-center">
          {[...Array(2)].map((_, i) => (
            <Fragment key={i}>
              <span className="text-2xl md:text-4xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-brand">Premium Execution</span>
              <svg className="w-3 h-3 text-brand-orange fill-current shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span className="text-2xl md:text-4xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-brand">Bespoke Design</span>
              <svg className="w-3 h-3 text-brand-orange fill-current shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span className="text-2xl md:text-4xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-brand">Global Reach</span>
              <svg className="w-3 h-3 text-brand-orange fill-current shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span className="text-2xl md:text-4xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-brand">Unforgettable Moments</span>
              <svg className="w-3 h-3 text-brand-orange fill-current shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
              </svg>
            </Fragment>
          ))}
        </div>
      </section>

      {/* Bento Grid Services Preview */}
      <section className="pt-12 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight"
            >
              OUR <span className="text-gradient">Services</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Card */}
            <SpotlightCard className="md:col-span-2 md:row-span-2 group">
              <img
                src="/service-b2b-event-management.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 z-10">
                <span className="px-4 py-1.5 rounded-full border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-widest mb-6 inline-block">Flagship Service</span>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">B2B Event Management</h3>
                <p className="text-gray-300 text-lg max-w-xl">Seamless B2B events like conferences, sales meets, brand launches, etc. with tailored itineraries to boost event goals and maximize outcomes.</p>
              </div>
            </SpotlightCard>

            {/* Small Card 1 */}
            <SpotlightCard className="group">
              <img
                src="/service-digital-branding.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/15"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/15 to-brand-orange/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-10 h-full flex flex-col justify-end relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Digital Designing & Branding</h3>
                <p className="text-gray-300">Creating captivating and functional event stands tailored to the client's brand and objectives.</p>
              </div>
            </SpotlightCard>

            {/* Small Card 2 */}
            <SpotlightCard className="group">
              <img
                src="/service-stand-fabrication.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/15"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-brand-orange/15 to-brand-red/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-10 h-full flex flex-col justify-end relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Stand Designing & Fabrication</h3>
                <p className="text-gray-300">We design, render, model and fabricate reliable, elaborate and intricate stands to best reflect the brand identity.</p>
              </div>
            </SpotlightCard>
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/services" className="group relative inline-flex items-center justify-center cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] blur-xl opacity-30 transition-all duration-700"></div>
              
              <div
                className="relative px-10 py-5 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] rounded-full overflow-hidden flex items-center gap-3 shadow-2xl"
              >
                <span className="relative z-10 text-white font-bold tracking-wide uppercase text-sm drop-shadow-md">View All Services</span>
                <ArrowRight size={20} className="relative z-10 text-white drop-shadow-md" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative z-10 overflow-hidden border-t border-white/5 bg-brand-dark/20">
        {/* Futuristic circular orbital rings in background */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-25">
          <svg width="600" height="600" viewBox="0 0 600 600" className="animate-[spin_40s_linear_infinite]">
            <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(255,140,0,0.05)" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="120" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="10 15" />
            <path d="M 300 20 A 280 280 0 0 1 580 300" fill="none" stroke="url(#gradient-stats-orbit)" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
            <defs>
              <linearGradient id="gradient-stats-orbit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff3b3b" stopOpacity="0" />
                <stop offset="50%" stopColor="#ff8c00" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="w-[80vw] h-[40vh] bg-gradient-radial from-brand-orange/5 via-brand-red/5 to-transparent blur-[100px] opacity-80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {[
              { number: "500+", label: "Events Executed" },
              { number: "30+", label: "Years Experience" },
              { number: "50+", label: "Global Destinations" },
              { number: "1M+", label: "Guests Hosted" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="relative flex flex-col items-center justify-center text-center px-6 group"
              >
                {/* Visual Target Scope above numbers */}
                <div className="mb-4 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/60 group-hover:bg-brand-orange group-hover:scale-150 transition-all duration-500 shadow-[0_0_10px_rgba(255,140,0,0.8)]"></span>
                </div>

                <div className="relative z-10">
                  {/* Large glowing typography */}
                  <h3 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 group-hover:from-brand-yellow group-hover:via-brand-orange group-hover:to-brand-red transition-all duration-700 drop-shadow-lg leading-none mb-4">
                    {stat.number}
                  </h3>
                  
                  {/* Minimal accent line */}
                  <div className="w-6 h-0.5 bg-white/20 mx-auto rounded-full mb-4 group-hover:bg-brand-orange group-hover:w-16 transition-all duration-500"></div>
                  
                  <p className="text-gray-400 font-bold uppercase tracking-[0.25em] text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                {/* Elegant separator line for desktop (fades at the edges) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pt-14 pb-10 relative z-10 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange mb-3 inline-block">Success Stories</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
              WHAT OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">CLIENTS SAY</span>
            </h2>
          </motion.div>
        </div>

        {/* Free flowing marquee list */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-gradient">
          <div className="animate-marquee flex gap-6 hover:[animation-play-state:paused] py-4">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="glass p-8 rounded-2xl border border-white/10 w-[350px] md:w-[400px] shrink-0 whitespace-normal flex flex-col justify-between hover:border-brand-orange/40 hover:bg-white/[0.05] transition-all duration-500 shadow-xl group"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-brand-orange fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10 text-sm md:text-base">
                    "{item.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 text-brand-orange font-bold text-sm">
                    {item.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">{item.author}</h4>
                    <p className="text-gray-400 text-xs">{item.role}, <span className="text-brand-orange/80 font-medium">{item.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-10 pb-24 relative z-10 overflow-hidden border-t border-white/5 bg-brand-dark">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typography & Action */}
            <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">
              {/* Chip Tag */}
              <div className="flex items-center gap-3 px-4 py-2 glass rounded-full border border-white/10 mb-8 shadow-md">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-gray-300">
                  Collaborate With Us
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[0.95]">
                Let's Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Something</span> <br />
                <span className="text-outline text-outline-hover">Unforgettable</span>
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                Partner with Captive Events to transform your concepts into luxury activations, corporate exhibitions, and bespoke experiences. We handle strategy, design, and fabrication end to end.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <Link to="/contact" className="group relative inline-flex items-center justify-center w-full sm:w-auto cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] blur-xl opacity-30 transition-all duration-700"></div>
                  <div
                    className="relative px-10 py-5 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] rounded-full overflow-hidden flex items-center justify-center gap-3 shadow-2xl w-full sm:w-auto"
                  >
                    <span className="relative z-10 text-white font-bold tracking-wide uppercase text-sm drop-shadow-md">Start Planning</span>
                    <ArrowRight size={20} className="relative z-10 text-white drop-shadow-md" />
                  </div>
                </Link>

                <Link to="/portfolio" className="group relative inline-flex items-center justify-center gap-3 cursor-pointer text-gray-500 hover:text-white transition-all duration-300 py-5 px-10 font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden w-full sm:w-auto hover:shadow-[0_10px_30px_rgba(249,115,22,0.28)]">
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10">Explore Portfolio</span>
                  <span className="relative z-10 overflow-hidden w-5 h-5 flex items-center justify-center">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Holographic 3D Geodesic Installation */}
            <div className="lg:col-span-5 relative h-[450px] sm:h-[500px] w-full flex items-center justify-center z-10 group">
              {/* Spinning orbital background meshes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-15 animate-[spin_60s_linear_infinite] group-hover:opacity-35 transition-opacity duration-700">
                  {/* Grid lines inside orbital */}
                  <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 6" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255,140,0,0.15)" strokeWidth="1.5" />
                  {/* Geometric structure connector lines */}
                  <path d="M 200 20 L 327 93 L 380 200 L 327 307 L 200 380 L 73 307 L 20 200 L 73 93 Z" fill="none" stroke="url(#gradient-wireframe)" strokeWidth="1" />
                  <path d="M 200 70 L 292 122 L 330 200 L 292 278 L 200 330 L 108 278 L 70 200 L 108 122 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  <defs>
                    <linearGradient id="gradient-wireframe" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff3b3b" />
                      <stop offset="50%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ffcc00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Glowing focal point badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-44 h-44 flex items-center justify-center rounded-full glass border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden"
              >
                <div className="absolute inset-2 rounded-full overflow-hidden bg-brand-dark flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                  <img src="/logo.png" alt="Captive Events" className="w-full h-full object-contain filter brightness-110 contrast-125" />
                </div>
                {/* Back-glow aura that scales up on hover */}
                <div className="absolute -inset-1 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] opacity-30 blur-md group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 pointer-events-none"></div>
              </motion.div>

              {/* Floating coordinates / technical blueprint labels */}
              <div className="absolute top-10 left-10 font-mono text-[9px] text-gray-500 group-hover:text-brand-orange transition-colors duration-500">
                SYS_LOC // 25.2048° N, 55.2708° E
              </div>
              <div className="absolute bottom-10 right-10 font-mono text-[9px] text-gray-500 group-hover:text-brand-orange transition-colors duration-500">
                FAB_UNIT // ACTIVE // v2.026
              </div>

              {/* Interactive micro-sparkles */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20"
              >
                <Sparkles className="w-4 h-4 text-brand-orange" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-20"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
