import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <>
      <motion.a
        href="/PDF.pdf"
        download="Captive-Events-Company-Profile.pdf"
        aria-label="Download Captive Events company profile"
        title="Company Profile"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.15 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="group fixed bottom-[5.75rem] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-brand-red via-brand-orange to-brand-yellow text-white shadow-[0_12px_35px_rgba(255,92,20,0.35)] md:bottom-[7.5rem] md:right-10 md:h-16 md:w-16"
      >
        <span className="absolute inset-0 rounded-full bg-brand-orange/25 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        <Download className="relative h-6 w-6 md:h-7 md:w-7" strokeWidth={2.2} aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black shadow-[0_12px_35px_rgba(0,0,0,0.35)] md:text-sm">
          Company Profile
          <span className="absolute right-5 top-full h-0 w-0 border-x-[7px] border-t-[7px] border-x-transparent border-t-white" />
        </span>
      </motion.a>

      <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: 1 // wait for initial page load
      }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center"
    >
      {/* Pulse glow effect behind the button */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 blur-xl animate-pulse" />
      
      {/* Inner Ping effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

      {/* Main Button */}
      <a
        href="https://wa.me/971581732763"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg shadow-black/40 text-white cursor-pointer group"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-full h-full flex items-center justify-center rounded-full"
        >
          {/* Custom WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 md:w-8 md:h-8"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </motion.div>
      </a>
      </motion.div>
    </>
  );
};

export default FloatingWhatsApp;
