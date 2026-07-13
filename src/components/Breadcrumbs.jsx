import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ current }) => {
  return (
    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 mb-8">
      <Link to="/" className="hover:text-white transition-colors">Home</Link>
      <ChevronRight size={14} className="text-white/20" />
      <Link to="/services" className="hover:text-white transition-colors">Services</Link>
      <ChevronRight size={14} className="text-white/20" />
      <span className="text-white">{current}</span>
    </nav>
  );
};

export default Breadcrumbs;
