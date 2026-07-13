import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-4 md:px-0 flex justify-center w-full"
    >
      <div className="glass-heavy px-6 py-2.5 rounded-full flex justify-between items-center w-full max-w-6xl shadow-2xl">
        <Link to="/" className="flex items-center mr-8 cursor-pointer">
          <img src="/logo.png" alt="Captive Events Logo" className="h-8 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans font-medium transition-colors text-sm uppercase tracking-widest hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-red hover:to-brand-orange ${
                  location.pathname === link.path ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link to="/booking">
            <MagneticButton variant="gradient" className="py-2 px-5 text-sm">Book Now</MagneticButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white hover:text-brand-orange focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-heavy rounded-2xl border border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-display font-bold uppercase tracking-wider hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-red hover:to-brand-orange ${
                  location.pathname === link.path ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 mt-2 border-t border-white/10">
            <Link to="/booking" onClick={() => setIsOpen(false)}>
              <MagneticButton variant="gradient" className="w-full">Book Now</MagneticButton>
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
