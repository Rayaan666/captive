import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-8 mt-auto">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="footer-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff3b3b" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
        </defs>
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4 cursor-pointer">
              <img src="/logo.png" alt="Captive Events Logo" className="h-10 md:h-14 w-auto object-contain" />
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Premium event planning and production for corporate events, luxury weddings, and unforgettable brand experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/captiveevents/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.bing.com/search?q=captive%20events%20insta&qs=n&form=QBRE&sp=-1&ghc=2&lq=0&pq=captive%20events%20insta&sc=10-20&sk=&cvid=C83599EDC1B349FA91CA72155511673A" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://ae.linkedin.com/company/captive-events-dubai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Our Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Portfolio</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Blogs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">Our Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">B2B Event Management</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Exhibition Stands &amp; Fabrication</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Designing &amp; Branding</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Audio Visual Equipment</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors cursor-pointer">Event Videography &amp; Media</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="shrink-0" stroke="url(#footer-icon-gradient)" />
                <span className="text-sm">+971 58 173 2763</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="shrink-0" stroke="url(#footer-icon-gradient)" />
                <span className="text-sm">hello@captiveevents.ae</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Captive Events. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
