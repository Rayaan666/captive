import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.55 5.56A6.74 6.74 0 0 1 13.67 0h-3.11v16.72a3.18 3.18 0 1 1-2.2-3.03V10.5a6.33 6.33 0 1 0 5.31 6.22V8.23a9.82 9.82 0 0 0 5.76 1.84V6.96a6.7 6.7 0 0 1-1.88-1.4Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.79h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.38 4.63ZM.06 24l6.3-1.65A11.88 11.88 0 1 0 .16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24Z" />
  </svg>
);

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
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/captiveevents/', icon: <InstagramIcon /> },
                { label: 'Facebook', href: 'https://www.facebook.com/captiveevents/', icon: <FacebookIcon /> },
                { label: 'LinkedIn', href: 'https://ae.linkedin.com/company/captive-events-dubai', icon: <LinkedInIcon /> },
                { label: 'TikTok', href: 'https://www.tiktok.com/@captiveevents', icon: <TikTokIcon /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 p-2.5 text-gray-400 transition-all hover:-translate-y-0.5 hover:bg-brand-orange hover:text-white"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
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
                <a href="tel:+971581732763" className="text-sm transition-colors hover:text-brand-orange">+971 58 173 2763</a>
              </li>
              <li>
                <a
                  href="https://wa.me/971581732763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  aria-label="Chat with Captive Events on WhatsApp"
                >
                  <span className="h-5 w-5"><WhatsAppIcon /></span>
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="shrink-0" stroke="url(#footer-icon-gradient)" />
                <a href="mailto:info@captiveevents.com" className="text-sm hover:text-brand-orange transition-colors">
                  info@captiveevents.com
                </a>
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
