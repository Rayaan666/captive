import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  Tag,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import SEO from '../components/SEO';
import { getBlogBySlug, getPublishedBlogs } from '../services/blogApi';
import {
  loadGoogleFont,
  getResolvedFontFamily,
  formatInlineHtml,
  FONT_SIZE_MAP,
} from '../utils/blogTypography';

// Custom Social Share Icons
const WhatsAppShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.79h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.38 4.63ZM.06 24l6.3-1.65A11.88 11.88 0 1 0 .16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24Z" />
  </svg>
);

const LinkedInShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

const XShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getBlogBySlug(slug);
        if (!data) {
          setError('Article not found.');
        } else {
          setBlog(data);
          loadGoogleFont(data.fontFamily);
          // Fetch related stories
          const all = await getPublishedBlogs({ limit: 4 });
          setRelatedBlogs(all.filter((b) => b.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        setError(err.message || 'Failed to load article.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://captiveevents.com/blogs/${slug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${blog?.title}\n\nRead more at: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleShareX = () => {
    const text = encodeURIComponent(blog?.title || '');
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center py-32 text-center">
        <RefreshCw className="w-8 h-8 text-brand-orange animate-spin mb-4" />
        <p className="text-gray-400 text-sm tracking-wide">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-3xl font-display font-black text-white mb-3">Article Not Found</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 font-light">
          The publication you are looking for might have been moved, updated, or unpublished.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-brand-orange/30 transition-all"
        >
          <ArrowLeft size={14} /> Back to All Articles
        </Link>
      </div>
    );
  }

  const resolvedFontFamily = getResolvedFontFamily(blog.fontFamily);
  const resolvedFontColor = blog.fontColor || '#e5e7eb';
  const resolvedAccentColor = blog.accentColor || '#ff8c00';
  const sizeConfig = FONT_SIZE_MAP[blog.fontSize] || FONT_SIZE_MAP.normal;

  return (
    <div
      className="bg-brand-dark min-h-screen text-white relative overflow-hidden pt-28 pb-24"
      style={{ fontFamily: resolvedFontFamily }}
    >
      {/* Dynamic SEO */}
      <SEO
        title={blog.metaTitle || `${blog.title} | Captive Events Dubai`}
        description={blog.metaDescription || blog.excerpt}
        canonical={`/blogs/${blog.slug}`}
      />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 right-[-15%] w-[45vw] h-[45vw] bg-brand-red/10 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

      {/* Ambient Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
        </div>

        {/* Header Hero */}
        <header className="mb-10 text-center sm:text-left">
          {/* Category Badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: `${resolvedAccentColor}4d`,
              backgroundColor: `${resolvedAccentColor}1a`,
              color: resolvedAccentColor,
            }}
          >
            <Sparkles size={12} style={{ color: resolvedAccentColor }} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              {blog.category}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: resolvedFontFamily }}
          >
            {blog.title}
          </h1>

          <p
            className="text-base sm:text-lg font-light leading-relaxed mb-8 opacity-90"
            style={{ color: resolvedFontColor }}
          >
            {blog.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center text-white font-bold text-sm shadow-md">
                {blog.author?.charAt(0) || 'C'}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{blog.author}</div>
                <div className="text-gray-400 text-xs">{blog.authorRole || 'Event Specialist'}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-orange" />
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Recent'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-brand-orange" />
                {blog.readTime || '5 min read'}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Cover Photo */}
        {blog.coverImage && (
          <div className="rounded-3xl overflow-hidden mb-12 border border-white/15 shadow-2xl relative">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div
          className="prose prose-invert max-w-none leading-relaxed space-y-6"
          style={{
            fontFamily: resolvedFontFamily,
            color: resolvedFontColor,
            fontSize: sizeConfig.fontSize,
            lineHeight: sizeConfig.lineHeight,
          }}
        >
          {blog.content.split('\n\n').map((block, idx) => {
            // Heading 2
            if (block.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-black text-white pt-8 pb-2 border-b border-white/10 mt-8 mb-4 tracking-tight"
                  style={{ fontFamily: resolvedFontFamily }}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(block.replace('## ', '')) }}
                />
              );
            }

            // Heading 3
            if (block.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="text-xl sm:text-2xl font-bold mt-6 mb-3"
                  style={{
                    fontFamily: resolvedFontFamily,
                    color: resolvedAccentColor,
                  }}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(block.replace('### ', '')) }}
                />
              );
            }

            // Blockquote
            if (block.startsWith('> ')) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 p-6 rounded-r-2xl italic text-lg my-6 shadow-inner font-light leading-relaxed"
                  style={{
                    borderColor: resolvedAccentColor,
                    backgroundColor: `${resolvedAccentColor}12`,
                    color: resolvedFontColor,
                    fontFamily: resolvedFontFamily,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatInlineHtml(block.replace('> ', '').replace(/^"|"$/g, '')),
                  }}
                />
              );
            }

            // Bullet List
            if (block.startsWith('- ')) {
              const items = block.split('\n').map((line) => line.replace(/^- /, ''));
              return (
                <ul key={idx} className="space-y-2.5 pl-2 my-4">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                        style={{ backgroundColor: resolvedAccentColor }}
                      />
                      <span
                        style={{ color: resolvedFontColor }}
                        dangerouslySetInnerHTML={{ __html: formatInlineHtml(item) }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }

            // In-article Image: ![Alt](url)
            const imgMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imgMatch) {
              return (
                <figure key={idx} className="my-8 rounded-2xl overflow-hidden border border-white/10">
                  <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto object-cover" />
                  {imgMatch[1] && (
                    <figcaption className="text-center text-xs text-gray-400 py-2 bg-black/40">
                      {imgMatch[1]}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // Standard Paragraph
            return (
              <p
                key={idx}
                className="font-light leading-relaxed"
                style={{ color: resolvedFontColor }}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(block) }}
              />
            );
          })}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1">
              <Tag size={12} /> Tags:
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Sharing Toolbar */}
        <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
            <Share2 size={16} className="text-brand-orange" />
            <span>Share this article:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] text-gray-300 border border-white/10 transition-colors cursor-pointer"
              title="Share on WhatsApp"
            >
              <WhatsAppShareIcon />
            </button>

            <button
              onClick={handleShareLinkedIn}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] text-gray-300 border border-white/10 transition-colors cursor-pointer"
              title="Share on LinkedIn"
            >
              <LinkedInShareIcon />
            </button>

            <button
              onClick={handleShareX}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/20 hover:text-white text-gray-300 border border-white/10 transition-colors cursor-pointer"
              title="Share on X (Twitter)"
            >
              <XShareIcon />
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                'Copy Link'
              )}
            </button>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-brand-black border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg">
            {blog.author?.charAt(0) || 'C'}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block mb-1">
              About the Author
            </span>
            <h4 className="text-lg font-bold text-white mb-2">{blog.author}</h4>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Captive Events is a premier full-service event management, audio-visual engineering, and custom stage fabrication company headquartered in Dubai, delivering bespoke experiences for global brands and luxury clientele.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-bold uppercase tracking-wide text-white">
                Related Articles
              </h3>
              <Link
                to="/blogs"
                className="text-xs font-bold uppercase tracking-wider text-brand-orange hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blogs/${rel.slug}`}
                  className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-brand-orange/40 rounded-2xl p-4 flex flex-col group transition-all"
                >
                  <div className="h-36 rounded-xl overflow-hidden mb-3 relative bg-black/40">
                    <img
                      src={rel.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Luxury CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-black via-white/[0.02] to-brand-black border border-brand-orange/30 text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mb-4">
            Bring Your Vision to Life with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Captive Events</span>
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto font-light mb-8">
            Speak with our creative directors and technical specialists to craft an unforgettable event experience in Dubai or anywhere in the GCC.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-brand-orange/30 transition-all hover:-translate-y-0.5"
          >
            Book Your Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
