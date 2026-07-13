import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeValue, setActiveValue] = useState(0);
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  useEffect(() => {
    // Dynamic SEO optimization for the About Page
    document.title = "About Captive Events | Premium Event Management Company in Dubai, UAE";
    
    // Manage Description Meta tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Discover Captive Events, a premier event management company in Dubai, UAE. We specialize in luxury weddings, premium corporate events, and bespoke exhibition stand fabrication with over 30 years of legacy.";
    
    // Manage Keywords Meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "event management company dubai, corporate event planner uae, luxury wedding planners dubai, exhibition stand fabricators dubai, captive events dubai, premium event agency uae";
  }, []);

  const teamMembers = [
    {
      name: 'Khurram Ilyas',
      role: 'Founder & CEO',
      image: '/team/1.png'
    },
    {
      name: 'Dr. Sherin Shervani',
      role: 'Founder & Director',
      image: '/team/2.png'
    },
    {
      name: 'Talha Omar',
      role: 'Senior Accounts Manager',
      image: '/team/3.png'
    },
    {
      name: 'Abdul Ahad Shervani',
      role: 'Procurement & Operations Manager',
      image: '/team/4.png'
    },
    {
      name: 'Fahad Ali',
      role: 'Operations Supervisor',
      image: '/team/5.png'
    }
  ];

  const coreValues = [
    {
      id: '01',
      title: 'Innovation',
      subtitle: 'The Art of the Unseen',
      description: 'We constantly push the boundaries of conventional event design. By integrating cutting-edge technology and avant-garde aesthetics, we deliver experiences that have never been seen before.'
    },
    {
      id: '02',
      title: 'Precision',
      subtitle: 'Flawless Execution',
      description: 'The difference between a good event and a masterpiece lies in the details. Our logistical mastery ensures that every single element, from lighting cues to guest flow, is orchestrated with absolute perfection.'
    },
    {
      id: '03',
      title: 'Excellence',
      subtitle: 'The Premium Standard',
      description: 'We do not compromise on quality. Every material chosen, every partner collaborated with, and every moment curated is held to the highest global standards of luxury and excellence.'
    },
    {
      id: '04',
      title: 'Passion',
      subtitle: 'Heart in Every Moment',
      description: 'We are driven by a profound love for what we do. This passionate energy is infused into every project, creating deeply emotional and unforgettable connections for our clients and their guests.'
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/about/hero.png"
            alt="Captive Events - Award-winning Event Management Company in Dubai, UAE"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-brand-dark"></div>
        </div>

        {/* Dynamic Light Wash */}
        <div className="absolute inset-0 z-0 opacity-30">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-brand-orange/20 rounded-full blur-[100px] mix-blend-screen"
          ></motion.div>
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] bg-brand-red/15 rounded-full blur-[100px] mix-blend-screen"
          ></motion.div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-brand-orange">
              OUR LEGACY & VISION
            </p>
            <h1 className="text-[9vw] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-display font-black leading-none uppercase tracking-tighter drop-shadow-2xl mb-8">
              We Are <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Captive Events</span>
              <span className="block mt-4 text-[10px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-gray-400 normal-case">
                Premium Event Management Company in Dubai & UAE
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium tracking-wide leading-relaxed"
          >
            We orchestrate the impossible, transforming bold visions into cinematic reality. As a leading event management company in Dubai with over 30 years of expertise across the UAE, we design immersive corporate experiences, luxury wedding events, and premium exhibitions that captivate and inspire.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-20 relative z-10">
        {/* Our Story Section - Holographic Chrono-Scope Redesign */}
        <div className="relative pt-2 pb-8 md:pt-4 md:pb-12 overflow-hidden border-b border-white/5 bg-brand-dark">
          
          {/* Ambient Tech Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
            <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange block mb-3">
                LEGACY CHRONOLOGY
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Story</span>
              </h2>
            </div>

            {/* Core Chrono-Scope Interface */}
            <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[420px] max-w-5xl mx-auto">
              
              {/* Left Key Indicator (Genesis) */}
              <div 
                className="order-2 lg:order-1 flex flex-col items-center lg:items-end cursor-pointer group select-none"
                onMouseEnter={() => setActiveSection('genesis')}
              >
                <div className="text-center lg:text-right space-y-2">
                  <div className={`text-5xl md:text-6xl font-display font-black tracking-tighter leading-none transition-colors duration-500 ${
                    activeSection !== 'evolution' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange drop-shadow-[0_0_20px_rgba(255,59,59,0.3)]' : 'text-white/20 group-hover:text-white/50'
                  }`}>
                    1996
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                    activeSection !== 'evolution' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange' : 'text-gray-500'
                  }`}>
                    Genesis of Excellence
                  </div>
                </div>
                {/* Active Indicator Ring */}
                <div className="mt-4 flex items-center justify-center relative w-12 h-12">
                  <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                    activeSection !== 'evolution' ? 'border-brand-red scale-110 opacity-100' : 'border-white/10 scale-90 opacity-40 group-hover:opacity-100 group-hover:scale-100'
                  }`} />
                  <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                    activeSection !== 'evolution' ? 'bg-brand-red shadow-[0_0_12px_#ff3b3b]' : 'bg-white/20'
                  }`} />
                </div>
              </div>

              {/* Center Holographic Portal */}
              <div className="order-1 lg:order-2 relative w-[290px] h-[290px] md:w-[350px] md:h-[350px] flex items-center justify-center z-10">
                {/* Concentric telemetry rings */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_120s_linear_infinite]" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(255,140,0,0.03)" strokeWidth="1.5" strokeDasharray="10 15" />
                  <path d="M 200 15 A 185 185 0 0 1 385 200" fill="none" stroke="url(#scope-grad)" strokeWidth="1.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="scope-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff3b3b" stopOpacity="0" />
                      <stop offset="100%" stopColor="#ff8c00" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>

                <svg className="absolute inset-4 w-[92%] h-[92%] animate-[spin_80s_linear_infinite_reverse]" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(255,140,0,0.05)" strokeWidth="1" strokeDasharray="30 100" />
                </svg>

                {/* Laser scan lines sweeping vertically */}
                <motion.div 
                  animate={{ y: [-130, 130, -130] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-40 z-20 blur-[1px]"
                />

                {/* Main Circular Viewport */}
                <div className="relative w-[210px] h-[210px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border border-white/10 p-2 glass z-10">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    {/* Blending overlay for color control */}
                    <div className={`absolute inset-0 z-10 mix-blend-color transition-colors duration-1000 ${
                      activeSection === 'evolution' ? 'bg-brand-orange/20' : 'bg-brand-red/20'
                    }`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent z-10" />
                    
                    {/* Focus Crosshairs */}
                    <div className="absolute inset-6 z-20 pointer-events-none border border-white/5 rounded-full flex items-center justify-center">
                      <div className="w-5 h-[1px] bg-brand-orange/40 absolute" />
                      <div className="h-5 w-[1px] bg-brand-orange/40 absolute" />
                    </div>

                    <motion.img 
                      key={activeSection}
                      initial={{ scale: 1.15, opacity: 0 }}
                      animate={{ scale: 1.0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src="/whoweare.png"
                      alt="Captive Events Viewport"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Cybernetic Telemetry Data */}
                <div className="absolute top-2 left-2 z-20 font-mono text-[8px] text-white/30 hidden md:block">
                  <div>SYS.SHUTTER_OK</div>
                  <div>ALIGNMENT: TRUE</div>
                </div>
                <div className="absolute bottom-2 right-2 z-20 font-mono text-[8px] text-white/30 text-right hidden md:block">
                  <div>LAT: 25.2048° N</div>
                  <div>LONG: 55.2708° E</div>
                </div>
              </div>

              {/* Right Key Indicator (Evolution) */}
              <div 
                className="order-3 flex flex-col items-center lg:items-start cursor-pointer group select-none"
                onMouseEnter={() => setActiveSection('evolution')}
              >
                <div className="text-center lg:text-left space-y-2">
                  <div className={`text-5xl md:text-6xl font-display font-black tracking-tighter leading-none transition-colors duration-500 ${
                    activeSection === 'evolution' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange drop-shadow-[0_0_20px_rgba(255,140,0,0.3)]' : 'text-white/20 group-hover:text-white/50'
                  }`}>
                    2026
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                    activeSection === 'evolution' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange' : 'text-gray-500'
                  }`}>
                    Setting the Premium Standard
                  </div>
                </div>
                {/* Active Indicator Ring */}
                <div className="mt-4 flex items-center justify-center relative w-12 h-12">
                  <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                    activeSection === 'evolution' ? 'border-brand-orange scale-110 opacity-100' : 'border-white/10 scale-90 opacity-40 group-hover:opacity-100 group-hover:scale-100'
                  }`} />
                  <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                    activeSection === 'evolution' ? 'bg-brand-orange shadow-[0_0_12px_#ff8c00]' : 'bg-white/20'
                  }`} />
                </div>
              </div>

            </div>

            {/* Dynamic Content Projection Screen (Telemetry Ticker) */}
            <div className="w-full max-w-3xl mt-12 md:mt-16 text-center min-h-[160px]">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1 glass rounded-full border border-white/5 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                  Telemetry Stream: {activeSection === 'evolution' ? 'evolution_node' : 'genesis_node'}
                </div>
                
                <h4 className="text-xl md:text-3xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange tracking-wide">
                  {activeSection === 'evolution' ? 'SETTING THE PREMIUM STANDARD' : 'THE GENESIS OF EXCELLENCE'}
                </h4>
                
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light font-sans">
                  {activeSection === 'evolution' 
                    ? "Today, Captive Events stands as a premier event management company with over 30 years of expertise, delivering corporate events, exhibitions, brand activations, roadshows, gala dinners, and luxury experiences through innovative planning, seamless execution, and exceptional attention to detail across the UAE and beyond."
                    : "Captive Events was established with a vision to redefine event management through bespoke solutions, client-centric strategies, and narrative-driven experiences. Our mission has always been to transform ideas into memorable events that reflect each client's ambitions, values, and unique identity with creativity and precision."
                  }
                </p>

                {activeSection === 'evolution' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-2 border-t border-white/5 inline-block text-[11px] font-mono text-gray-500 uppercase tracking-widest mt-4"
                  >
                    "We build environments that captivate, communicate, and create unforgettable impressions."
                  </motion.div>
                )}
              </motion.div>
            </div>

          </div>
        </div>        {/* Mission and Vision - Cinematic Split Expansion Panel */}
        <div className="relative z-10 pt-16 pb-2 mb-2">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange block mb-3">
              OUR CORE PURPOSE
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
              Our Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Mission</span> & Vision
              <span className="block mt-2 text-xs md:text-sm font-sans font-bold tracking-[0.2em] text-gray-500 normal-case">
                Driving Bespoke Event Planning & Production in Dubai & UAE
              </span>
            </h2>
          </div>

          <div className="relative w-full min-h-[550px] flex flex-col lg:flex-row gap-6 items-stretch select-none overflow-hidden rounded-3xl p-2 bg-black/20 backdrop-blur-md border border-white/5">
            {/* Mission Panel */}
            <motion.div 
              onMouseEnter={() => setActiveSection('mission')}
              onMouseLeave={() => setActiveSection(null)}
              animate={{ 
                flexGrow: activeSection === 'mission' ? 2 : activeSection === 'vision' ? 0.6 : 1.2
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="relative overflow-hidden cursor-pointer flex flex-col justify-between p-8 md:p-12 transition-all duration-500 bg-white/[0.01] border border-white/5 rounded-2xl group min-h-[280px] lg:min-h-0"
            >
              {/* Dynamic Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-brand-orange/5 to-transparent transition-opacity duration-700 pointer-events-none ${activeSection === 'mission' ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}></div>
              
              {/* Floating Glow Orb */}
              <motion.div 
                animate={{
                  x: activeSection === 'mission' ? [0, 20, 0] : 0,
                  y: activeSection === 'mission' ? [0, -20, 0] : 0,
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className={`absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-orange/20 blur-[100px] transition-opacity duration-700 pointer-events-none ${activeSection === 'mission' ? 'opacity-100' : 'opacity-0'}`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                {/* Header / Number */}
                <div className="flex justify-between items-start">
                  <span className={`font-display font-black text-6xl md:text-8xl transition-all duration-500 ${activeSection === 'mission' ? 'text-brand-orange' : 'text-white/10'}`}>
                    01
                  </span>
                  <span className="text-[10px] tracking-[0.4em] font-bold text-gray-500 uppercase mt-4">
                    THE EXECUTION
                  </span>
                </div>

                {/* Main Content */}
                <div className="mt-8 lg:mt-0">
                  <h3 className={`text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight mb-4 transition-all duration-300 ${activeSection === 'mission' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange' : 'text-white'}`}>
                    Mission
                  </h3>
                  
                  {/* Expandable Paragraph */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      opacity: activeSection === 'mission' || activeSection === null ? 1 : 0.4,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light max-w-xl transition-all duration-300">
                      To meticulously design and execute extraordinary corporate events, exhibition stands, luxury weddings, and brand activations that transcend expectations. We blend innovative design with unmatched logistical precision in Dubai and across the UAE, ensuring every moment is captivating, meaningful, and perfectly aligned with our clients' objectives.
                    </p>
                  </motion.div>
                </div>

                {/* Footer indicator */}
                <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                    CAPTIVE EVENTS • EST 1996
                  </span>
                  <motion.span 
                    animate={{ x: activeSection === 'mission' ? 5 : 0 }}
                    className="text-brand-orange text-lg"
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Vision Panel */}
            <motion.div 
              onMouseEnter={() => setActiveSection('vision')}
              onMouseLeave={() => setActiveSection(null)}
              animate={{ 
                flexGrow: activeSection === 'vision' ? 2 : activeSection === 'mission' ? 0.6 : 1.2
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="relative overflow-hidden cursor-pointer flex flex-col justify-between p-8 md:p-12 transition-all duration-500 bg-white/[0.01] border border-white/5 rounded-2xl group min-h-[280px] lg:min-h-0"
            >
              {/* Dynamic Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-bl from-brand-red/20 via-brand-red/5 to-transparent transition-opacity duration-700 pointer-events-none ${activeSection === 'vision' ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}></div>
              
              {/* Floating Glow Orb */}
              <motion.div 
                animate={{
                  x: activeSection === 'vision' ? [0, -20, 0] : 0,
                  y: activeSection === 'vision' ? [0, 20, 0] : 0,
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-red/20 blur-[100px] transition-opacity duration-700 pointer-events-none ${activeSection === 'vision' ? 'opacity-100' : 'opacity-0'}`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                {/* Header / Number */}
                <div className="flex justify-between items-start">
                  <span className={`font-display font-black text-6xl md:text-8xl transition-all duration-500 ${activeSection === 'vision' ? 'text-brand-red' : 'text-white/10'}`}>
                    02
                  </span>
                  <span className="text-[10px] tracking-[0.4em] font-bold text-gray-500 uppercase mt-4">
                    THE HORIZON
                  </span>
                </div>

                {/* Main Content */}
                <div className="mt-8 lg:mt-0">
                  <h3 className={`text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight mb-4 transition-all duration-300 ${activeSection === 'vision' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red' : 'text-white'}`}>
                    Vision
                  </h3>
                  
                  {/* Expandable Paragraph */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      opacity: activeSection === 'vision' || activeSection === null ? 1 : 0.4,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light max-w-xl transition-all duration-300">
                      To be the globally recognized vanguard of the event planning industry, setting the ultimate standard for creativity, luxury coordination, and bespoke experiential storytelling. We envision a future where Captive Events is synonymous with legendary, transformative experiences that leave an indelible mark on corporate and social cultures.
                    </p>
                  </motion.div>
                </div>

                {/* Footer indicator */}
                <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                    CAPTIVE EVENTS • EST 1996
                  </span>
                  <motion.span 
                    animate={{ x: activeSection === 'vision' ? 5 : 0 }}
                    className="text-brand-red text-lg"
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Core Values - Interactive Orbital Constellation Layout */}
        <div className="relative z-10 w-full pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden bg-brand-dark border-t border-white/5">
          
          {/* Ambient Cosmic Background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div 
              animate={{ 
                background: [
                  'radial-gradient(circle at 30% 30%, rgba(255, 60, 60, 0.05) 0%, transparent 60%)',
                  'radial-gradient(circle at 70% 60%, rgba(255, 140, 0, 0.05) 0%, transparent 60%)',
                  'radial-gradient(circle at 30% 30%, rgba(255, 60, 60, 0.05) 0%, transparent 60%)',
                ],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange block mb-3">
                THE CAPTIVE DNA
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Values</span>
              </h2>
            </div>

            {/* Main Interactive Canvas */}
            <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[500px]">
              
              {/* Left Column: The Orbital Constellation */}
              <div className="lg:col-span-6 flex justify-center items-center relative h-[380px] sm:h-[450px]">
                {/* SVG Constellation lines and orbits */}
                <svg className="absolute w-full h-full max-w-[420px] max-h-[420px] pointer-events-none z-10" viewBox="0 0 400 400">
                  {/* Outer Orbit Path */}
                  <motion.circle 
                    cx="200" 
                    cy="200" 
                    r="140" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Inner Orbit Path */}
                  <motion.circle 
                    cx="200" 
                    cy="200" 
                    r="90" 
                    fill="none" 
                    stroke="rgba(255,140,0,0.05)" 
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Active Laser Line connecting selected node to center */}
                  {coreValues.map((value, idx) => {
                    // Coordinates of the 4 nodes
                    const coords = [
                      { x: 200, y: 60 },   // Top (Innovation)
                      { x: 340, y: 200 },  // Right (Precision)
                      { x: 200, y: 340 },  // Bottom (Excellence)
                      { x: 60, y: 200 }    // Left (Passion)
                    ];
                    
                    const isActive = activeValue === idx;
                    if (!isActive) return null;

                    return (
                      <g key={`laser-${idx}`}>
                        <motion.line 
                          x1="200" 
                          y1="200" 
                          x2={coords[idx].x} 
                          y2={coords[idx].y}
                          stroke="url(#laser-gradient)"
                          strokeWidth="2"
                          strokeDasharray="100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <circle cx={coords[idx].x} cy={coords[idx].y} r="6" fill="#ff8c00" className="blur-[2px] animate-pulse" />
                      </g>
                    );
                  })}

                  {/* SVG Gradients definitions */}
                  <defs>
                    <linearGradient id="laser-gradient" x1="50%" y1="50%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff3b3b" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ff8c00" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Central DNA Core Orb */}
                <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full z-20 flex items-center justify-center">
                  {/* Outer Aura */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: 360 
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-0 rounded-full blur-xl opacity-40 transition-colors duration-700 ${
                      activeValue === 0 ? 'bg-brand-teal' :
                      activeValue === 1 ? 'bg-brand-orange' :
                      activeValue === 2 ? 'bg-brand-yellow' :
                      'bg-brand-red'
                    }`}
                  />
                  
                  {/* Inner Glowing Core */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/5 to-white/10" />
                    <span className="font-display font-black text-xs text-white/40 tracking-[0.2em] uppercase text-center select-none leading-none">
                      DNA
                    </span>
                  </div>
                </div>

                {/* Interactive Value Nodes placed absolutely around the Orbit */}
                {[
                  { label: 'Innovation', top: '6%', left: '50%', index: 0, icon: '💡' },
                  { label: 'Precision', top: '50%', left: '85%', index: 1, icon: '🎯' },
                  { label: 'Excellence', top: '85%', left: '50%', index: 2, icon: '👑' },
                  { label: 'Passion', top: '50%', left: '15%', index: 3, icon: '🔥' }
                ].map((node) => {
                  const isActive = activeValue === node.index;
                  return (
                    <div
                      key={node.index}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                      style={{ top: node.top, left: node.left }}
                      onMouseEnter={() => setActiveValue(node.index)}
                    >
                      {/* Interactive Ring */}
                      <div className="relative flex items-center justify-center">
                        <motion.div 
                          animate={{ 
                            scale: isActive ? [1, 1.4, 1] : 1,
                            borderColor: isActive ? 'rgba(255, 140, 0, 0.8)' : 'rgba(255,255,255,0.1)'
                          }}
                          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                          className="w-10 h-10 rounded-full border flex items-center justify-center bg-brand-dark transition-all duration-300 group-hover:border-brand-orange/50"
                        >
                          <span className={`text-sm transition-transform duration-300 ${isActive ? 'scale-110' : 'opacity-60 group-hover:opacity-100'}`}>
                            {node.icon}
                          </span>
                        </motion.div>

                        {/* Text Label */}
                        <div className={`absolute whitespace-nowrap transition-all duration-300 font-display font-black uppercase text-xs tracking-[0.2em] pointer-events-none ${
                          node.top === '6%' ? 'top-12 left-1/2 -translate-x-1/2' :
                          node.top === '85%' ? 'bottom-12 left-1/2 -translate-x-1/2' :
                          node.left === '85%' ? 'left-14 top-1/2 -translate-y-1/2' :
                          'right-14 top-1/2 -translate-y-1/2'
                        } ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange scale-105' : 'text-white/40 group-hover:text-white/80'}`}>
                          {node.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Typographic Details HUD */}
              <div className="lg:col-span-6 flex flex-col justify-center min-h-[300px] select-none text-left pl-0 lg:pl-12">
                <motion.div
                  key={activeValue}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Index and Tech Info */}
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500 tracking-wider">
                    <span className="text-brand-orange font-bold font-display text-lg">
                      {coreValues[activeValue].id}
                    </span>
                    <span>/</span>
                    <span>04</span>
                    <span className="w-8 h-[1px] bg-white/10"></span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      [SYS_VAL_ALIGN_{coreValues[activeValue].title.toUpperCase()}]
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange mb-2">
                      {coreValues[activeValue].title}
                    </h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
                      {coreValues[activeValue].subtitle}
                    </p>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light max-w-xl">
                    {coreValues[activeValue].description}
                  </p>

                  {/* Geographic Theme coordinates detail */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>LOCATION: UAE.REGION</span>
                    <span>COORD: 25.2048° N, 55.2708° E</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Our Team - Cinematic Expansion Grid (Team Section) */}
        <div className="relative z-10 w-full pt-10 pb-10 md:pt-12 md:pb-12 bg-brand-dark overflow-hidden border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange block mb-3">
                  THE VISIONARIES
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Team</span>
                </h2>
              </div>
              <p className="text-gray-400 max-w-md text-sm md:text-base font-medium">
                The architects behind the extraordinary. A collective of passionate creators, strategists, and perfectionists dedicated to crafting unparalleled experiences.
              </p>
            </div>

            {/* The Accordion Grid */}
            <div className="flex flex-col md:flex-row w-full h-[500px] md:h-[650px] gap-2 md:gap-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
              {teamMembers.map((member, idx) => {
                const isActive = activeTeamMember === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveTeamMember(idx)}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${
                      isActive ? 'md:flex-[3.5] flex-[3] bg-brand-orange/10' : 'md:flex-[1] flex-[0.8] bg-white/[0.02]'
                    }`}
                  >
                    {/* Image */}
                    <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'scale-105 filter-none opacity-100' : 'scale-100 grayscale opacity-30 md:opacity-50'}`}>
                      {/* Gradient overlay for readability */}
                      <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 z-10 ${isActive ? 'from-brand-dark via-brand-dark/60 to-transparent opacity-100' : 'from-brand-dark via-transparent to-transparent opacity-80'}`} />
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                      
                      {/* Vertical Text (Visible when NOT active) */}
                      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 md:block hidden ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <span className="text-white/40 group-hover:text-white/80 transition-colors font-display font-bold uppercase tracking-[0.3em] whitespace-nowrap text-sm" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                          {member.name}
                        </span>
                      </div>

                      {/* Horizontal Details (Visible when active) */}
                      <div className={`transition-all duration-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-8 md:w-12 h-[1px] bg-brand-orange"></span>
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-orange max-w-full">
                            {member.role}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Glowing Border effect when active */}
                    <div className={`absolute inset-0 border border-white/5 rounded-2xl transition-colors duration-700 z-30 pointer-events-none ${isActive ? 'border-brand-orange/40 shadow-[inset_0_0_40px_rgba(255,140,0,0.1)]' : 'group-hover:border-white/20'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
                  Partner with Dubai's Best
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[0.95]">
                Let's Craft <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Your Legacy</span> <br />
                <span className="text-outline text-outline-hover">Experience</span>
                <span className="block mt-4 text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-gray-400 normal-case">
                  Award-Winning Event Management & Production in Dubai & UAE
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl font-sans">
                Partner with Dubai's premier event planning agency to transform your next vision into a landmark activation, bespoke corporate exhibition, or luxury celebration. Leverage our 30+ years of local execution experience to orchestrate an unforgettable environment that captivates audiences across the Middle East.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <Link to="/contact" className="group relative inline-flex items-center justify-center w-full sm:w-auto cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow blur-xl opacity-30 transition-all duration-700"></div>
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
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow opacity-30 blur-md group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 pointer-events-none"></div>
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

export default About;
