import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Clock,
  User,
  Calendar,
  Search,
  Tag,
  BookOpen,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPublishedBlogs } from '../services/blogApi';

const CATEGORIES = [
  'All',
  'Event Trends',
  'Corporate Events',
  'Luxury Weddings',
  'Exhibitions & Stands',
  'Brand Activations',
  'Audio Visual & Tech',
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await getPublishedBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to load published blogs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filtered stories
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (activeCategory !== 'All' && blog.category?.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = blog.title?.toLowerCase().includes(q);
        const matchesExcerpt = blog.excerpt?.toLowerCase().includes(q);
        const matchesTags = blog.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesTags) return false;
      }
      return true;
    });
  }, [blogs, activeCategory, searchQuery]);

  // Featured Story: First post or most recent
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="bg-brand-dark min-h-screen text-white relative overflow-hidden pt-28 pb-24">
      <SEO
        title="Event Management Insights & Ideas Dubai | Captive Events"
        description="Explore luxury event management insights, corporate gala trends, stagecraft innovations, and brand activation strategies in Dubai and the UAE."
        canonical="/blogs"
      />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[65vw] h-[65vw] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/3 right-[-10%] w-[40vw] h-[40vw] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Ambient Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Glowing Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 shadow-[0_0_20px_rgba(255,140,0,0.15)] mb-6">
              <Sparkles size={14} className="text-brand-orange animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
                Journal &amp; Insights
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-6 leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Knowledge</span> &amp; Inspiration
            </h1>

            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              Explore premier event production blueprints, luxury hospitality trends, kinetic stagecraft, and brand activation strategies across Dubai and the UAE.
            </p>
          </motion.div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/[0.02] border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-lg shadow-brand-orange/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-black/40 border border-white/10 focus:border-brand-orange text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 text-center">
            <RefreshCw className="w-8 h-8 text-brand-orange animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm tracking-wide">Curating editorial insights...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-3xl p-8">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              {searchQuery
                ? `No articles matched your search for "${searchQuery}".`
                : 'No published stories in this category yet. Check back soon!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold uppercase tracking-wider text-brand-orange hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {/* FEATURED STORY SPOTLIGHT */}
            {featuredBlog && !searchQuery && activeCategory === 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/[0.02] hover:border-brand-orange/40 transition-all group"
              >
                <Link to={`/blogs/${featuredBlog.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left: Image */}
                  <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[460px] overflow-hidden relative">
                    <img
                      src={featuredBlog.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80'}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-brand-black/90 backdrop-blur-md">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-brand-orange/15 border border-brand-orange/30 text-brand-orange">
                          Featured • {featuredBlog.category}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock size={12} /> {featuredBlog.readTime || '5 min read'}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white group-hover:text-brand-orange transition-colors leading-tight mb-4">
                        {featuredBlog.title}
                      </h2>

                      <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-3 mb-6">
                        {featuredBlog.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        <span className="block text-white font-semibold">{featuredBlog.author}</span>
                        <span className="text-gray-500">
                          {featuredBlog.createdAt
                            ? new Date(featuredBlog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Recent'}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* GRID OF STORIES */}
            <div>
              {featuredBlog && !searchQuery && activeCategory === 'All' && remainingBlogs.length > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white">
                    Latest Publications
                  </h3>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(featuredBlog && !searchQuery && activeCategory === 'All'
                  ? remainingBlogs
                  : filteredBlogs
                ).map((blog, idx) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="bg-white/[0.02] border border-white/10 hover:border-brand-orange/40 rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-brand-orange/5"
                  >
                    <Link to={`/blogs/${blog.slug}`} className="flex-1 flex flex-col">
                      {/* Card Image */}
                      <div className="h-56 overflow-hidden relative bg-black/40">
                        <img
                          src={blog.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                            <span>{blog.author}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> {blog.readTime || '5 min read'}
                            </span>
                          </div>

                          <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-orange transition-colors leading-snug mb-3 line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-3 mb-6">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">
                            {blog.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </span>

                          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read Story <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Editorial Booking CTA Banner */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-black via-white/[0.02] to-brand-black border border-brand-orange/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mb-4">
            Planning a Premier Event in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Dubai</span>?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light mb-8">
            From visionary concept ideation to turnkey audio-visual staging and bespoke fabrication, our team transforms bold ideas into unforgettable reality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-brand-orange/30 transition-all hover:-translate-y-0.5"
            >
              Book Consultation
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest border border-white/10 transition-colors"
            >
              Explore Our Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
