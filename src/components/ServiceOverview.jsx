import { useRef } from "react";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const copyVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const visualLayouts = {
  leftHigh: {
    large: "left-0 top-0 w-[76%] h-[78%]",
    small: "right-0 bottom-0 w-[55%] h-[43%]",
  },
  rightHigh: {
    large: "right-0 top-0 w-[76%] h-[78%]",
    small: "left-0 bottom-0 w-[55%] h-[43%]",
  },
  leftLow: {
    large: "left-0 bottom-0 w-[76%] h-[78%]",
    small: "right-0 top-0 w-[55%] h-[43%]",
  },
};

const ServiceOverview = ({ data }) => {
  const sectionRef = useRef(null);
  const overview = data.overview;
  const layout = visualLayouts[overview.layout] || visualLayouts.leftHigh;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const largeImageY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const smallImageY = useTransform(scrollYProgress, [0, 1], [-14, 18]);

  return (
    <section
      ref={sectionRef}
      id={`${data.slug}-overview`}
      className="relative overflow-hidden bg-[#07070a] pt-12 pb-16 md:pt-16"
      aria-labelledby={`${data.slug}-overview-heading`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-1/3 h-80 w-80 rounded-full bg-[#ff3b3b]/[0.06] blur-[110px]" />
        <div className="absolute right-[-8rem] top-1/4 h-96 w-96 rounded-full bg-[#ff8c00]/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#00d2ff]/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 xl:gap-24">
          <motion.div
            variants={copyVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-2xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-[#ff3b3b] via-[#ff8c00] to-[#ffcc00]" />
              <p className="bg-gradient-to-r from-[#ff5a36] via-[#ff9d24] to-[#ffd05a] bg-clip-text text-xs font-bold uppercase tracking-[0.24em] text-transparent sm:text-sm">
                {overview.eyebrow}
              </p>
            </div>

            <h2
              id={`${data.slug}-overview-heading`}
              className="max-w-xl text-3xl font-display font-black leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
            >
              {overview.heading}
            </h2>

            <div className="mt-7 max-w-xl space-y-5 text-base font-light leading-7 text-gray-300 sm:text-[17px] sm:leading-8">
              <p>{overview.paragraphs[0]}</p>
              <p>{overview.paragraphs[1]}</p>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-2"
              aria-label={`${data.heroHeading} key capabilities`}
            >
              {overview.capabilities.map((capability) => (
                <motion.li
                  key={capability}
                  variants={itemVariants}
                  className="group flex items-center gap-3 text-sm font-semibold text-gray-100 sm:text-[15px]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-[#ff3b3b] via-[#ff7a18] to-[#e6a900] shadow-[0_7px_24px_rgba(255,88,22,0.2)] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5">
                    <Check size={16} strokeWidth={3} className="text-white" aria-hidden="true" />
                  </span>
                  <span>{capability}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[430px] w-full max-w-[590px] sm:h-[540px] lg:h-[610px]"
          >
            <div className="pointer-events-none absolute inset-[12%] rounded-full bg-gradient-to-br from-[#ff3b3b]/25 via-[#ff8c00]/20 to-[#00d2ff]/10 blur-[75px]" />

            <motion.figure
              style={{ y: largeImageY }}
              whileHover={{ y: -7, scale: 1.012 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`absolute ${layout.large} overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#0d0d11] shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_45px_rgba(255,91,31,0.08)]`}
            >
              <img
                src={overview.images[0].src}
                alt={overview.images[0].alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: overview.images[0].position }}
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.04]" />
            </motion.figure>

            <motion.figure
              style={{ y: smallImageY }}
              whileHover={{ y: -6, scale: 1.018 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`absolute ${layout.small} overflow-hidden rounded-[1.4rem] border border-white/[0.14] bg-[#0d0d11] shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(0,210,255,0.07)]`}
            >
              <img
                src={overview.images[1].src}
                alt={overview.images[1].alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: overview.images[1].position }}
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/[0.05]" />
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
