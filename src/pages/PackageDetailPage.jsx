import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { getPackageBySlug } from "../data/packagesData";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay },
  }),
};

// ─── Section 1: Cinematic Hero ────────────────────────────────────────────────
const PackageHero = ({ pkg }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const headingLines = pkg.hero.heading.split("\n");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label={`${pkg.hero.heading} hero section`}
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={pkg.hero.bgImage}
          alt={`${pkg.hero.heading} — Captive Events`}
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </motion.div>

      {/* Animated floating orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: pkg.accentColor }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ background: "#ff3b3b" }}
        />
      </div>

      {/* Floating accent dots */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: pkg.accentColor,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Breadcrumbs */}
      <motion.nav
        className="absolute top-24 left-0 right-0 z-10 px-6 md:px-12 lg:px-20"
        aria-label="Breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ol className="flex items-center gap-2 text-xs text-white/40 font-medium tracking-wider uppercase">
          <li><Link to="/" className="hover:text-white/70 transition-colors">Home</Link></li>
          <li><ChevronRight size={12} /></li>
          <li><Link to="/services" className="hover:text-white/70 transition-colors">Services</Link></li>
          <li><ChevronRight size={12} /></li>
          <li className="text-white/60">{pkg.hero.heading.replace("\n", " ")}</li>
        </ol>
      </motion.nav>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 px-6 md:px-12 lg:px-20 pt-32 pb-24 max-w-7xl mx-auto w-full"
        style={{ opacity }}
      >
        {/* Package number + category */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <span
            className="text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full border"
            style={{
              color: pkg.accentColor,
              borderColor: pkg.accentColor + "50",
              backgroundColor: pkg.accentColor + "10",
            }}
          >
            {pkg.num}
          </span>
          <div className="w-8 h-px" style={{ background: pkg.accentColor + "80" }} />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/50">
            {pkg.hero.category}
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-8 overflow-hidden">
          {headingLines.map((line, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={0.35 + i * 0.12}>
              <h1
                className="font-display font-black leading-[0.9] uppercase tracking-tighter text-white"
                style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              >
                {i === 1 ? (
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${pkg.accentColor}, #ff3b3b)`,
                    }}
                  >
                    {line}
                  </span>
                ) : (
                  line
                )}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light mb-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          {pkg.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
        >
          <Link to="/contact">
            <div className="relative group">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${pkg.accentColor}, #ff3b3b)` }}
              />
              <div
                className="relative px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm text-white flex items-center gap-3 shadow-2xl"
                style={{ background: `linear-gradient(90deg, ${pkg.accentColor}, #ff3b3b)` }}
              >
                Request Proposal
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 font-bold uppercase tracking-widest text-sm transition-all duration-300"
          >
            Contact Our Team
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
};

// ─── Section 2: What Makes This Package Different ─────────────────────────────
const PackageDifferentiators = ({ pkg }) => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="differentiators-heading">
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
        style={{ background: pkg.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Editorial heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px" style={{ background: pkg.accentColor }} />
              <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: pkg.accentColor }}>
                What Makes This Different
              </span>
            </div>

            <h2
              id="differentiators-heading"
              className="font-display font-black leading-[0.9] uppercase tracking-tight text-white mb-8"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              {pkg.differentiators.heading.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "block text-transparent bg-clip-text" : "block"} style={i === 1 ? { backgroundImage: `linear-gradient(135deg, ${pkg.accentColor}, #ff3b3b)` } : {}}>
                  {line}
                </span>
              ))}
            </h2>

            <p className="text-white/50 text-lg leading-relaxed font-light max-w-md">
              {pkg.differentiators.description}
            </p>
          </motion.div>

          {/* Right: 4 feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pkg.differentiators.features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="group relative p-6 rounded-2xl overflow-hidden cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${pkg.accentColor}40`,
                      background: `radial-gradient(circle at 80% 20%, ${pkg.accentColor}08, transparent 70%)`,
                    }}
                  />

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: pkg.accentColor + "15", border: `1px solid ${pkg.accentColor}30` }}
                  >
                    <Icon size={18} style={{ color: pkg.accentColor }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 3: What's Included (Luxury Grid) ─────────────────────────────────
const PackageInclusions = ({ pkg }) => {
  return (
    <section className="py-20 md:py-28 relative" aria-labelledby="inclusions-heading">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: pkg.accentColor + "80" }} />
            <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: pkg.accentColor }}>
              Package Inclusions
            </span>
            <div className="w-8 h-px" style={{ background: pkg.accentColor + "80" }} />
          </div>
          <h2
            id="inclusions-heading"
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            What&apos;s{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${pkg.accentColor}, #ff3b3b)` }}
            >
              Included
            </span>
          </h2>
        </motion.div>

        {/* Glowing glass grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pkg.inclusions.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i * 0.06}
                className="group relative flex flex-col items-center justify-center p-7 rounded-2xl text-center overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${pkg.accentColor}50, 0 20px 60px ${pkg.accentColor}10`,
                    background: `radial-gradient(circle at 50% 0%, ${pkg.accentColor}12, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: pkg.accentColor + "12", border: `1px solid ${pkg.accentColor}25` }}
                  whileHover={{ rotate: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={20} style={{ color: pkg.accentColor }} />
                </motion.div>

                <p className="relative z-10 text-sm font-bold text-white/80 tracking-wide leading-tight">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Premium Showcase ─────────────────────────────────────────────────────────
const PackageShowcase = ({ pkg }) => {
  return (
    <section className="py-20 md:py-28" aria-label="Project showcase gallery">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-6 h-px" style={{ background: pkg.accentColor }} />
          <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: pkg.accentColor }}>
            Premium Showcase
          </span>
        </motion.div>

        {/* Gallery Layout: 1 large + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Featured — large */}
          <motion.div
            className="lg:col-span-7 relative overflow-hidden rounded-3xl"
            style={{ height: "clamp(300px, 50vw, 560px)" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={pkg.showcase.featured.src}
              alt={pkg.showcase.featured.alt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div
              className="absolute bottom-6 left-6 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: pkg.accentColor + "20",
                border: `1px solid ${pkg.accentColor}40`,
                color: pkg.accentColor,
                backdropFilter: "blur(10px)",
              }}
            >
              Featured Work
            </div>
          </motion.div>

          {/* Supporting — stacked */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-4 lg:gap-5">
            {pkg.showcase.supporting.map((img, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-3xl"
                style={{ height: "clamp(140px, 22vw, 268px)" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.15 + i * 0.1}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 6: Why Captive Events (Vertical Timeline) ────────────────────────
const PackageTimeline = ({ pkg }) => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="timeline-heading">
      {/* Vertical gradient line bg */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-10 pointer-events-none hidden lg:block"
        style={{ background: `linear-gradient(180deg, transparent, ${pkg.accentColor}, transparent)` }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: pkg.accentColor + "80" }} />
            <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: pkg.accentColor }}>
              Our Process
            </span>
            <div className="w-8 h-px" style={{ background: pkg.accentColor + "80" }} />
          </div>
          <h2
            id="timeline-heading"
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Why{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${pkg.accentColor}, #ff3b3b)` }}
            >
              Captive Events
            </span>
          </h2>
        </motion.div>

        {/* Timeline steps */}
        <div className="relative">
          {/* Vertical connector line (mobile + desktop) */}
          <div
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px opacity-15"
            style={{ background: `linear-gradient(180deg, ${pkg.accentColor}, transparent)` }}
          />

          <div className="flex flex-col gap-0">
            {pkg.timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative flex items-start gap-6 pl-16 lg:pl-0 ${
                    isLeft ? "lg:justify-start lg:pr-[calc(50%+3rem)]" : "lg:justify-end lg:pl-[calc(50%+3rem)]"
                  } pb-12`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i * 0.08}
                >
                  {/* Step dot */}
                  <div
                    className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 z-10"
                    style={{ borderColor: pkg.accentColor, background: "#050505" }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: pkg.accentColor }} />
                  </div>

                  {/* Content card */}
                  <div
                    className="p-5 rounded-2xl max-w-xs"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: pkg.accentColor }}
                      >
                        {item.step}
                      </span>
                      <h3 className="font-display font-bold text-white text-sm">{item.label}</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 7: Final CTA ─────────────────────────────────────────────────────
const PackageCTA = ({ pkg }) => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Ambient bg glow */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${pkg.accentColor}, #ff3b3b 40%, transparent 70%)`,
        }}
      />
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: pkg.accentColor + "60" }} />
            <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: pkg.accentColor }}>
              {pkg.tag}
            </span>
            <div className="w-8 h-px" style={{ background: pkg.accentColor + "60" }} />
          </div>

          <h2
            id="cta-heading"
            className="font-display font-black text-white uppercase tracking-tight leading-[0.9] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            Let&apos;s Build Something{" "}
            <span
              className="text-transparent bg-clip-text block"
              style={{ backgroundImage: `linear-gradient(135deg, ${pkg.accentColor}, #ff3b3b)` }}
            >
              Extraordinary.
            </span>
          </h2>

          <p className="text-white/40 text-lg leading-relaxed max-w-xl mx-auto mb-14 font-light">
            Tell us about your project and we&apos;ll respond with a fully tailored proposal within 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/contact">
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${pkg.accentColor}, #ff3b3b)` }}
                />
                <div
                  className="relative px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm text-white flex items-center gap-3 shadow-2xl"
                  style={{ background: `linear-gradient(90deg, ${pkg.accentColor}, #ff3b3b)` }}
                >
                  Request Proposal
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="group px-10 py-5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center gap-3"
            >
              Contact Our Team
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </div>

          {/* Internal links */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <Link to="/services" className="text-xs text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest font-medium">
              All Services
            </Link>
            <span className="text-white/10">·</span>
            <Link to="/portfolio" className="text-xs text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest font-medium">
              Our Portfolio
            </Link>
            <span className="text-white/10">·</span>
            <Link to="/about" className="text-xs text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest font-medium">
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const PackageDetailPage = () => {
  const { packageSlug } = useParams();
  const pkg = getPackageBySlug(packageSlug);

  if (!pkg) return <Navigate to="/services" replace />;

  const siteUrl = "https://captiveevents.com";
  const canonicalUrl = `${siteUrl}${pkg.canonicalPath}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.hero.heading.replace("\n", " "),
    description: pkg.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Captive Events",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      telephone: "+971-XXXXXXXX",
    },
    areaServed: ["Dubai", "UAE", "Abu Dhabi", "Sharjah"],
    serviceType: pkg.tag,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: pkg.hero.heading.replace("\n", " "), item: canonicalUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{pkg.seoTitle}</title>
        <meta name="description" content={pkg.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pkg.seoTitle} />
        <meta property="og:description" content={pkg.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}${pkg.ogImage}`} />
        <meta property="og:site_name" content="Captive Events" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pkg.seoTitle} />
        <meta name="twitter:description" content={pkg.metaDescription} />
        <meta name="twitter:image" content={`${siteUrl}${pkg.ogImage}`} />

        {/* Schema */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="flex-grow bg-[#050505] min-h-screen overflow-x-hidden">
        <PackageHero pkg={pkg} />
        <PackageShowcase pkg={pkg} />
        <PackageDifferentiators pkg={pkg} />
        <PackageInclusions pkg={pkg} />
        <PackageTimeline pkg={pkg} />
        <PackageCTA pkg={pkg} />
      </div>
    </>
  );
};

export default PackageDetailPage;
