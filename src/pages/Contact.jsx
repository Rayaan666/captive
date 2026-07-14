import { motion } from 'framer-motion';
import { Phone, Mail, Clock, ChevronDown, Send } from 'lucide-react';

const WhatsAppIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const Contact = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-dark min-h-screen font-sans selection:bg-brand-orange/30 selection:text-brand-orange overflow-hidden">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="contact-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff3b3b" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* ── 1. CONTACT HERO SECTION ────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-32 pb-20 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="/contact/hero.png"
            alt="Contact Captive Events - Premium Event Management Services in Dubai & UAE"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-brand-dark" />
        </div>
        
        {/* Cinematic Lighting Gradients */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen transform -translate-x-1/2"></div>
        
        {/* Ambient Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass shadow-xl mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">Contact Event Management Company Dubai</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[0.9]">
              Contact <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Captive Events</span>
              <span className="block mt-4 text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-gray-400 normal-case">
                Leading Event Management, Production &amp; Exhibition Agency in Dubai &amp; UAE
              </span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed">
              Connect with Dubai's premier corporate event organizers, exhibition stand contractors, and luxury event planning agency. Let's discuss your upcoming brand activations, corporate roadshows, gala award dinners, and technical audiovisual production across Dubai, Abu Dhabi, and the UAE.
            </p>

            <p className="sr-only">
              Connect with Captive Events for corporate events, exhibitions, brand activations, roadshows, gala dinners, luxury nautical experiences, audiovisual production, and bespoke event management services across Dubai and the UAE.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button
                onClick={scrollToForm}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden w-full sm:w-auto bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] shadow-[0_10px_30px_rgba(249,115,22,0.28)]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 skew-x-12" />
                <span className="relative z-10 text-white font-bold text-sm uppercase tracking-widest drop-shadow-md">Schedule Consultation</span>
                <ChevronDown size={18} className="relative z-10 text-white group-hover:translate-y-1 transition-transform drop-shadow-md" />
              </button>
              
              <a 
                href="https://wa.me/971581732763" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:border-transparent hover:text-white transition-all duration-300 w-full sm:w-auto backdrop-blur-md overflow-hidden hover:shadow-[0_10px_30px_rgba(249,115,22,0.28)]"
              >
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <WhatsAppIcon className="relative z-10 h-[18px] w-[18px] text-[#25D366] transition-colors group-hover:text-white" />
                <span className="relative z-10 text-white font-bold text-sm uppercase tracking-widest">WhatsApp Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2 & 3. CONTACT FORM & INFO CARDS ──────────────────────────────── */}
      <section id="contact-form" className="pt-10 pb-16 md:pt-12 md:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Whether you're planning a massive expo or a highly exclusive VIP gala, our team in Dubai is ready to orchestrate every detail.
                </p>
              </motion.div>

              {[
                { icon: Phone, title: "Phone", content: "+971 58 173 2763", color: "from-blue-500 to-brand-teal" },
                { icon: Mail, title: "Email", content: "info@captiveevents.com", color: "from-brand-red to-brand-orange" },
                { icon: Clock, title: "Working Hours", content: "Monday – Saturday, 9:00 AM – 6:00 PM", color: "from-purple-500 to-pink-500" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
                >
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl shrink-0 overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <item.icon
                      size={20}
                      className={`relative z-10 ${idx < 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange' : 'text-white'}`}
                      stroke={idx < 2 ? "url(#contact-icon-gradient)" : "currentColor"}
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{item.title}</h3>
                    <p className="text-white font-medium md:text-lg">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Glassmorphism Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative"
            >
              {/* Backglow for form */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-red/10 rounded-3xl blur-2xl transform -rotate-1" />
              
              <div className="relative glass border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <h3 className="text-2xl font-display font-bold text-white mb-8">Send an Enquiry</h3>
                
                <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="text" id="name" autoComplete="name" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors rounded-none" required maxLength={120} />
                      <label htmlFor="name" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Full Name *</label>
                    </div>
                    
                    <div className="relative group">
                      <input type="text" id="company" autoComplete="organization" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors rounded-none" maxLength={160} />
                      <label htmlFor="company" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Company Name</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="email" id="email" autoComplete="email" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors rounded-none" required maxLength={254} />
                      <label htmlFor="email" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Email Address *</label>
                    </div>
                    
                    <div className="relative group">
                      <input type="tel" id="phone" autoComplete="tel" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors rounded-none" required maxLength={25} />
                      <label htmlFor="phone" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Phone Number *</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select id="eventType" defaultValue="" className="w-full bg-transparent border-b border-white/20 pt-5 pb-2 text-white focus:outline-none focus:border-brand-orange transition-colors appearance-none rounded-none cursor-pointer" required>
                      <option value="" disabled className="bg-brand-dark text-gray-400">Select Event Type *</option>
                      <option value="Corporate Event" className="bg-brand-dark text-white">Corporate Event</option>
                      <option value="Exhibition" className="bg-brand-dark text-white">Exhibition &amp; Expo Stand</option>
                      <option value="Brand Activation" className="bg-brand-dark text-white">Brand Activation</option>
                      <option value="Roadshow" className="bg-brand-dark text-white">Roadshow</option>
                      <option value="Gala Dinner" className="bg-brand-dark text-white">Gala Dinner / Award Show</option>
                      <option value="Real Estate" className="bg-brand-dark text-white">Real Estate Event</option>
                      <option value="Nautical" className="bg-brand-dark text-white">Luxury Nautical Experience</option>
                      <option value="Audio Visual" className="bg-brand-dark text-white">Audio Visual Requirement</option>
                      <option value="Other" className="bg-brand-dark text-white">Other</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-0 top-6 text-gray-500 pointer-events-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative group">
                      <input type="date" id="date" aria-label="Event date" className="w-full bg-transparent border-b border-white/20 pt-5 pb-2 text-white focus:outline-none focus:border-brand-orange transition-colors rounded-none custom-date-input" />
                    </div>
                    
                    <div className="relative group">
                      <input type="number" id="guests" min="1" step="1" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors rounded-none" />
                      <label htmlFor="guests" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Est. Guests</label>
                    </div>

                    <div className="relative group">
                      <input type="text" id="location" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors rounded-none" maxLength={200} />
                      <label htmlFor="location" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Location</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea id="message" rows="4" placeholder=" " className="peer w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-white placeholder-transparent focus:outline-none focus:border-brand-orange transition-colors resize-none rounded-none" required maxLength={3000}></textarea>
                    <label htmlFor="message" className="absolute left-0 top-0 text-gray-500 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-brand-orange">Message / Project Brief *</label>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="group relative inline-flex items-center justify-center gap-3 w-full py-4 rounded-xl overflow-hidden bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] shadow-[0_10px_30px_rgba(249,115,22,0.28)] transition-transform hover:scale-[1.01]">
                      <span className="relative z-10 text-white font-bold text-sm uppercase tracking-widest drop-shadow-md">Send Enquiry</span>
                      <Send size={16} className="relative z-10 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform drop-shadow-md" />
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
