import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Palette, Box, Briefcase, Volume2, Camera, Megaphone,
  Trophy, Zap, Building2, Award, Anchor,
  ArrowRight, ArrowUpRight, Sparkles
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    num: "01", icon: Palette, title: "Digital Designing & Branding",
    desc: "Create captivating event branding, exhibition stand concepts, creative visuals, digital assets, and brand-focused experiences that strengthen identity, engage audiences, and maximize event impact.",
    accent: "#ff3b3b", tag: "Creative Strategy", image: "/services/1.png", slug: "digital-designing-branding"
  },
  {
    num: "02", icon: Box, title: "Stand Designing & Fabrication",
    desc: "From concept and 3D visualization to precision fabrication and installation, we design premium exhibition stands, custom displays, and immersive environments built to showcase your brand with excellence.",
    accent: "#ff8c00", tag: "Exhibition Excellence", image: "/services/2.png", slug: "stand-designing-fabrication"
  },
  {
    num: "03", icon: Briefcase, title: "B2B Event Management",
    desc: "Deliver professionally managed conferences, sales meetings, networking events, business summits, product launches, and corporate gatherings with tailored planning, flawless coordination, and measurable outcomes.",
    accent: "#ffcc00", tag: "Corporate Events", image: "/services/3.png", slug: "b2b-event-management"
  },
  {
    num: "04", icon: Volume2, title: "Audio Visual Equipment",
    desc: "Provide professional sound systems, LED displays, lighting, staging, projection, and audiovisual technologies that enhance audience engagement and deliver exceptional live event experiences.",
    accent: "#00d2ff", tag: "AV Production", image: "/services/4.png", slug: "audio-visual-equipment"
  },
  {
    num: "05", icon: Camera, title: "Event Videography & Photography",
    desc: "Capture every moment through cinematic event photography, professional videography, aerial coverage, creative storytelling, and post-production editing that preserves every experience beautifully.",
    accent: "#ff8c00", tag: "Media & Content", image: "/services/5.png", slug: "event-videography-photography"
  },
  {
    num: "06", icon: Megaphone, title: "Copywriting & Social Media Marketing",
    desc: "Develop compelling event copy, promotional campaigns, social media content, digital marketing assets, and audience engagement strategies that maximize visibility before, during, and after every event.",
    accent: "#ff3b3b", tag: "Digital Marketing", image: "/services/6.png", slug: "copywriting-social-media-marketing"
  },
];

const packages = [
  {
    num: "01", icon: Trophy, title: "Exhibitions & Expo Stands",
    desc: "Design, fabricate, and manage premium exhibition stands and expo displays that attract visitors, strengthen brand presence, and deliver memorable exhibition experiences from concept to completion.",
    borderGlow: "#ff8c00", tag: "Exhibitions",
    features: ["3D Stand Design", "Custom Fabrication", "On-site Installation", "Post-event Breakdown"],
    slug: "exhibitions-expo-stands",
  },
  {
    num: "02", icon: Zap, title: "Roadshows & Brand Activations",
    desc: "Execute high-impact roadshows and experiential brand activations that increase engagement, create meaningful customer interactions, and amplify brand visibility across strategic locations.",
    borderGlow: "#ff8c00", tag: "Brand Activation",
    features: ["Multi-city Roadshows", "Experiential Design", "Crowd Engagement", "Real-time Analytics"],
    slug: "roadshows-brand-activations",
  },
  {
    num: "03", icon: Briefcase, title: "Corporate Event Suite",
    desc: "Deliver seamless corporate lunches, networking events, conferences, team gatherings, executive meetings, and business functions designed to foster collaboration and lasting professional relationships.",
    borderGlow: "#ff8c00", tag: "Corporate",
    features: ["Venue Sourcing", "Catering & Logistics", "A/V Production", "Guest Management"],
    slug: "corporate-event-suite",
  },
  {
    num: "04", icon: Building2, title: "Real Estate Events",
    desc: "Create immersive property launches, strategic brand activations, promotional showcases, and high-impact real estate events that engage investors, attract buyers, and elevate property brands.",
    borderGlow: "#ff8c00", tag: "Real Estate",
    features: ["Property Launch Events", "Investor Showcases", "Scale Model Displays", "Branded Environments"],
    slug: "real-estate-events",
  },
  {
    num: "05", icon: Award, title: "Industry Galas & Award Shows",
    desc: "Produce prestigious gala dinners, award ceremonies, executive celebrations, and large-scale corporate events with flawless planning, sophisticated production, and exceptional guest experiences.",
    borderGlow: "#ff8c00", tag: "Gala & Awards",
    features: ["Stage & Set Design", "Ceremony Production", "Entertainment Curation", "VIP Hospitality"],
    slug: "industry-galas-award-shows",
  },
  {
    num: "06", icon: Anchor, title: "Luxury Nautical Experiences",
    desc: "Curate unforgettable yacht experiences, corporate retreats, fishing adventures, watersports, and luxury networking events that combine premium hospitality with exclusive experiences on the water.",
    borderGlow: "#ff8c00", tag: "Nautical Luxury",
    features: ["Private Yacht Charters", "Gourmet Catering", "Water Sports", "Sunset Dinners"],
    slug: "luxury-nautical-experiences",
  },
];

// ─── Section 01 Component: Cinematic Split Panel (No Cards) ───────────────────
const ServicePanel = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative py-12 md:py-16 overflow-hidden cursor-none"
      aria-label={service.title}
    >
      {/* ── Full-bleed background image ── */}
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      {/* Heavy dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-brand-dark/75" />

      {/* Directional side vignette — deepens toward text side */}
      <div
        className="absolute inset-0"
        style={{
          background: isEven
            ? "linear-gradient(90deg, rgba(7,7,10,0.92) 0%, rgba(7,7,10,0.6) 50%, rgba(7,7,10,0.15) 100%)"
            : "linear-gradient(90deg, rgba(7,7,10,0.15) 0%, rgba(7,7,10,0.6) 50%, rgba(7,7,10,0.92) 100%)",
        }}
      />

      {/* Accent color wash on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: isEven
            ? `radial-gradient(60% 80% at 20% 50%, ${service.accent}18, transparent)`
            : `radial-gradient(60% 80% at 80% 50%, ${service.accent}18, transparent)`,
        }}
      />

      {/* Top separator line — Bold & Visible Accent Divider */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}40 20%, ${service.accent} 50%, ${service.accent}40 80%, transparent)`
        }}
      />

      {/* Ghost number watermark */}
      <motion.div
        className="absolute select-none pointer-events-none font-display font-black leading-none"
        animate={{ opacity: hovered ? 0.07 : 0.03 }}
        transition={{ duration: 0.7 }}
        style={{
          fontSize: "clamp(12rem, 26vw, 24rem)",
          top: "50%",
          transform: "translateY(-50%)",
          [isEven ? "right" : "left"]: "-3vw",
          color: service.accent,
        }}
      >
        {service.num}
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-28 items-center">

          {/* Text column */}
          <div className={isEven ? "lg:order-1" : "lg:order-2"}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.div
                className="h-px"
                animate={{ width: hovered ? 64 : 32 }}
                transition={{ duration: 0.4 }}
                style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: service.accent }}>
                {service.tag}
              </span>
              <div className="flex-1" />
              <span className="font-display font-black text-xs tracking-widest" style={{ color: service.accent + "55" }}>
                {service.num}
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-white leading-[0.9] tracking-tighter uppercase mb-10"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
            >
              {service.title}
            </motion.h3>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="h-px mb-10 origin-left"
              style={{ background: `linear-gradient(90deg, ${service.accent}55, transparent)` }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-3 group/cta cursor-none">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0"
                  animate={{
                    background: hovered ? service.accent + "1a" : "transparent",
                    borderColor: hovered ? service.accent + "88" : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={14} style={{ color: service.accent }} />
                </motion.div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 group-hover/cta:text-white/70 transition-colors">
                  Enquire Now
                </span>
              </Link>

              <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 group/view-more cursor-none">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
                  View More 
                  <ArrowUpRight size={14} style={{ color: service.accent }} className="group-hover/view-more:translate-x-0.5 group-hover/view-more:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right: description + icon badge */}
          <div className={isEven ? "lg:order-2" : "lg:order-1"}>
            {/* Glowing icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 relative w-fit"
            >
              <motion.div
                className="absolute -inset-6 rounded-full blur-3xl"
                animate={{ opacity: hovered ? 0.55 : 0.15, scale: hovered ? 1.2 : 1 }}
                transition={{ duration: 0.7 }}
                style={{ background: service.accent + "30" }}
              />
              <motion.div
                animate={{ rotate: hovered ? 8 : 0, y: hovered ? -4 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Icon
                  size={48}
                  strokeWidth={0.85}
                  style={{ color: service.accent, filter: `drop-shadow(0 0 28px ${service.accent}80)` }}
                />
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-300 text-base md:text-lg leading-relaxed font-light"
            >
              {service.desc}
            </motion.p>

            {/* Dot bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-2 mt-8"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full h-[3px]"
                  animate={{
                    width: hovered && i === 0 ? 28 : 4,
                    opacity: hovered ? (i === 0 ? 1 : 0.25) : 0.2,
                  }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  style={{ background: service.accent }}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </motion.article>
  );
};

// ─── Section 02 Component: Premium Bento Card Grid ───────────────────────────
const PackagesGrid = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {packages.map((pkg, i) => {
        const Icon = pkg.icon;
        const isHovered = hoveredIdx === i;
        const packageGradientId = `package-gradient-${i}`;

        return (
          <motion.div
            key={pkg.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative overflow-hidden rounded-2xl cursor-none"
            style={{ minHeight: "320px" }}
          >
            {/* Glass base */}
            <div className="absolute inset-0 bg-white/[0.025] backdrop-blur-xl" />

            {/* Glowing border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? `inset 0 0 0 1px ${pkg.borderGlow}60, 0 0 40px ${pkg.borderGlow}18`
                  : `inset 0 0 0 1px rgba(255,255,255,0.06)`,
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Accent gradient blob on hover */}
            <motion.div
              className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
              animate={{ opacity: isHovered ? 0.35 : 0.08, scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.6 }}
              style={{ background: pkg.borderGlow }}
            />
            <motion.div
              className="absolute -top-12 -left-12 w-36 h-36 rounded-full blur-3xl pointer-events-none"
              animate={{ opacity: isHovered ? 0.18 : 0.04 }}
              transition={{ duration: 0.6 }}
              style={{ background: pkg.borderGlow }}
            />

            {/* Card content */}
            <div className="relative z-10 flex flex-col h-full p-7 md:p-8" style={{ minHeight: "320px" }}>
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id={packageGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff3b3b" />
                    <stop offset="100%" stopColor="#ff8c00" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Top row: number + tag */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[10px] font-black uppercase tracking-[0.35em] px-3 py-1 rounded-full border text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange"
                  style={{ borderColor: pkg.borderGlow + "35", backgroundColor: pkg.borderGlow + "12" }}
                >
                  {pkg.tag}
                </span>
                <span className="font-display font-black text-sm leading-none opacity-70 text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">
                  {pkg.num}
                </span>
              </div>

              {/* Icon */}
              <div className="relative w-fit mb-5">
                <motion.div
                  className="absolute -inset-4 rounded-full blur-2xl"
                  animate={{ opacity: isHovered ? 0.6 : 0.2 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: pkg.borderGlow + "40" }}
                />
                <motion.div
                  animate={{ y: isHovered ? -3 : 0, rotate: isHovered ? 6 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Icon
                    size={36}
                    strokeWidth={1.1}
                    stroke={`url(#${packageGradientId})`}
                    style={{ filter: `drop-shadow(0 0 12px ${pkg.borderGlow}70)` }}
                    className="relative z-10"
                  />
                </motion.div>
              </div>

              {/* Title */}
              <h3
                className="font-display font-black uppercase tracking-tight text-white leading-[1] mb-4"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)" }}
              >
                {pkg.title}
              </h3>

              {/* Divider line */}
              <motion.div
                className="h-px mb-5 origin-left"
                animate={{ scaleX: isHovered ? 1 : 0.35, opacity: isHovered ? 0.7 : 0.2 }}
                transition={{ duration: 0.5 }}
                style={{ background: `linear-gradient(90deg, ${pkg.borderGlow}, transparent)` }}
              />

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed font-light flex-1 mb-6">
                {pkg.desc}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-7">
                {pkg.features.map((f, fi) => (
                  <motion.span
                    key={fi}
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0.55,
                      y: isHovered ? 0 : 2,
                    }}
                    transition={{ duration: 0.3, delay: fi * 0.04 }}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/[0.08] text-white/50"
                  >
                    {f}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={`/services/packages/${pkg.slug}`}
                className="inline-flex items-center gap-3 group/cta cursor-none w-fit mt-auto"
              >
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center border shrink-0"
                  animate={{
                    background: isHovered ? pkg.borderGlow + "25" : "transparent",
                    borderColor: isHovered ? pkg.borderGlow + "80" : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight
                    size={14}
                    stroke={`url(#${packageGradientId})`}
                    className="group-hover/cta:rotate-45 transition-transform duration-300"
                  />
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35 group-hover/cta:text-white/70 transition-colors">
                  View Package
                </span>
              </Link>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Services = () => {
  return (
    <div className="bg-brand-dark overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-32 pb-20"
        aria-labelledby="services-hero-title"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/services/hero.png"
            alt="Captive Events - Premium Event Management Services in Dubai & UAE"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-brand-dark" />
        </div>
        <div className="absolute inset-0 z-0 opacity-30">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-brand-orange/20 rounded-full blur-[100px] mix-blend-screen"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] bg-brand-red/15 rounded-full blur-[100px] mix-blend-screen"
          />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">
              OUR SERVICES & EXPERTISE
            </p>
            <h1
              id="services-hero-title"
              className="text-[9vw] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-display font-black leading-none uppercase tracking-tighter drop-shadow-2xl mb-8"
            >
              We Craft
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">
                Experiences
              </span>
              <span className="block mt-4 text-[10px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-gray-400 normal-case">
                Premium Event Management Services in Dubai &amp; UAE
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium tracking-wide leading-relaxed"
          >
            Captive Events delivers bespoke event management services across Dubai and the UAE, combining creative
            strategy, event production, stand fabrication, audiovisual solutions, branding, and seamless execution
            to create memorable experiences that inspire audiences and elevate brands.
          </motion.p>
        </div>
      </section>

      {/* ── Section 01: Event Services — Cinematic Alternating Panels ─── */}
      <section className="relative" aria-labelledby="event-services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-brand-orange" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange font-bold text-xs uppercase tracking-[0.3em]">EVENT SERVICES</span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              id="event-services-title"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-white leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              Comprehensive Event Management
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange"> Services</span>
              <br />in Dubai &amp; UAE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-500 text-sm leading-relaxed max-w-xs lg:text-right shrink-0"
            >
              From concept to completion — every element executed with precision, creativity, and an unwavering
              commitment to excellence across the UAE.
            </motion.p>
          </div>
        </div>

        <p className="sr-only">
          Captive Events delivers bespoke event management services across Dubai and the UAE, combining creative strategy,
          event production, stand fabrication, audiovisual solutions, branding, digital marketing, and seamless execution
          to create memorable experiences that inspire audiences and elevate brands.
        </p>

        <div>
          {services.map((service, i) => (
            <ServicePanel key={service.num} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Cinematic Marquee Divider ─────────────────────────────────── */}
      <div className="relative py-6 overflow-hidden">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="relative overflow-hidden mask-gradient py-4">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[
              "Exhibition Design", "Brand Activations", "Corporate Events",
              "Gala Dinners", "AV Production", "Stand Fabrication",
              "Exhibition Design", "Brand Activations", "Corporate Events",
              "Gala Dinners", "AV Production", "Stand Fabrication",
            ].map((word, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-[0.3em] text-white/15 shrink-0 flex items-center gap-12">
                {word} <span className="text-brand-orange/30">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* ── Section 02: Event Packages — Premium Bento Card Grid ── */}
      <section className="relative pt-2 pb-12 md:pt-4 md:pb-16" aria-labelledby="event-packages-title">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-[150px] opacity-10"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, #ff8c00, #ff3b3b, transparent)" }}
          />
          <motion.div
            className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
            animate={{ scale: [1, 1.15, 1], y: [0, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            style={{ background: "radial-gradient(circle, #00d2ff, transparent)" }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-brand-orange" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange font-bold text-xs uppercase tracking-[0.3em]">EVENT PACKAGES</span>
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <motion.h2
                id="event-packages-title"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black text-white leading-tight max-w-2xl"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
              >
                Premium Event Solutions
                <span className="text-white"> Tailored</span>
                {" "}for Every Occasion
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-gray-500 text-sm leading-relaxed max-w-sm md:text-right shrink-0"
              >
                From corporate events and exhibitions to brand activations, gala dinners, and luxury experiences,
                we craft end-to-end event solutions across Dubai and the UAE.
              </motion.p>
            </div>
          </div>

          <p className="sr-only">
            From corporate events and exhibitions to brand activations, gala dinners, and luxury experiences,
            Captive Events provides end-to-end event planning, production, and execution designed to create
            unforgettable experiences across Dubai and the UAE.
          </p>

          {/* Premium Bento Card Grid */}
          <PackagesGrid />
        </div>
      </section>

      {/* CTA Section — Services Page Specific */}
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
                  Plan Your Next Dubai Event
                </span>
              </div>

              {/* Display Headline — SEO H2 */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[0.95]">
                Request a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Bespoke Event</span> <br />
                <span className="text-outline text-outline-hover">Proposal</span>
                <span className="block mt-4 text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-gray-400 normal-case">
                  Expert Event Management &amp; Production Services Across Dubai &amp; the UAE
                </span>
              </h2>

              {/* SEO Description */}
              <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl font-sans">
                From large-scale corporate exhibitions and bespoke brand activations to award galas, roadshows, and luxury nautical experiences — Captive Events is the UAE's trusted event management partner. Tell us about your project and receive a fully tailored event proposal within 48 hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <Link to="/contact" className="group relative inline-flex items-center justify-center w-full sm:w-auto cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow blur-xl opacity-30 transition-all duration-700"></div>
                  <div
                    className="relative px-10 py-5 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] rounded-full overflow-hidden flex items-center justify-center gap-3 shadow-2xl w-full sm:w-auto"
                  >
                    <span className="relative z-10 text-white font-bold tracking-wide uppercase text-sm drop-shadow-md">Get a Free Quote</span>
                    <ArrowRight size={20} className="relative z-10 text-white drop-shadow-md" />
                  </div>
                </Link>

                <Link to="/portfolio" className="group relative inline-flex items-center justify-center gap-3 cursor-pointer text-gray-500 hover:text-white transition-all duration-300 py-5 px-10 font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden w-full sm:w-auto hover:shadow-[0_10px_30px_rgba(249,115,22,0.28)]">
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10">View Our Work</span>
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

export default Services;
