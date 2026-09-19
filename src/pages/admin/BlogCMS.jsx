import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Lock,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Globe,
  Tag,
  Clock,
  User,
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  Calendar,
  X,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Bold,
  Italic,
  HelpCircle,
  UploadCloud,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  loginAdmin,
  getStoredAdminToken,
  clearStoredAdminToken,
} from '../../services/blogApi';
import SEO from '../../components/SEO';

const CATEGORY_PRESETS = [
  'Event Trends',
  'Corporate Events',
  'Luxury Weddings',
  'Exhibitions & Stands',
  'Brand Activations',
  'Audio Visual & Tech',
  'Dubai Insights',
];

const PRESET_IMAGES = [
  {
    label: 'Luxury Ballroom Gala',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Stage Lighting & Concert Rig',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Corporate Conference & Keynote',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'VIP Outdoor Cocktail Reception',
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Bespoke Exhibition Fabrication',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
  },
];

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const BlogCMS = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getStoredAdminToken()));
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Blog Management State
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All' | 'Published' | 'Draft'
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState('content'); // 'content' | 'seo' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('Event Trends');
  const [customCategory, setCustomCategory] = useState('');
  const [author, setAuthor] = useState('Captive Events Editorial');
  const [authorRole, setAuthorRole] = useState('Event Specialist');
  const [readTime, setReadTime] = useState('5 min read');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Dubai Events']);
  const [isPublished, setIsPublished] = useState(true);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Delete Confirmation Modal
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Live Preview Modal for quick view
  const [previewBlog, setPreviewBlog] = useState(null);

  // Image Inserter Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageTarget, setImageTarget] = useState('body'); // 'cover' | 'body'
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'url' | 'presets'

  const handleLocalImageUpload = (e, targetOverride) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image file size must be less than 10MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      const target = targetOverride || imageTarget;
      if (target === 'cover') {
        setCoverImage(dataUrl);
        showToast('Cover image updated!', 'success');
        setIsImageModalOpen(false);
      } else {
        setNewImageUrl(dataUrl);
        showToast('Image loaded! Click Insert Image to place into article.', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInsertImageToArticle = () => {
    if (!newImageUrl.trim()) {
      showToast('Please upload or enter an image URL first.', 'error');
      return;
    }

    if (imageTarget === 'cover') {
      setCoverImage(newImageUrl.trim());
      showToast('Cover image set successfully!', 'success');
    } else {
      const caption = newImageCaption.trim() ? newImageCaption.trim() : 'Event Image';
      const snippet = `![${caption}](${newImageUrl.trim()})`;
      insertContentSnippet(snippet);
      showToast('Image inserted into article body!', 'success');
    }

    setNewImageUrl('');
    setNewImageCaption('');
    setIsImageModalOpen(false);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch blogs when authenticated
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await getAdminBlogs();
      setBlogs(data);
    } catch (err) {
      if (err.message?.includes('Unauthorized') || err.message?.includes('401')) {
        clearStoredAdminToken();
        setIsAuthenticated(false);
        showToast('Session expired. Please enter the admin passcode again.', 'error');
      } else {
        showToast(err.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter the admin passcode.');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');

    try {
      await loginAdmin(passcode);
      setIsAuthenticated(true);
      setPasscode('');
      showToast('Welcome to Captive Events Blog CMS!', 'success');
    } catch (err) {
      setAuthError(err.message || 'Invalid passcode. Please check and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearStoredAdminToken();
    setIsAuthenticated(false);
    setBlogs([]);
    showToast('Logged out successfully.', 'info');
  };

  // Open Editor for Creating New Blog
  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setTitle('');
    setSlug('');
    setIsSlugManual(false);
    setExcerpt('');
    setContent(`## Executive Overview\n\nWrite your introduction here...\n\n### Key Highlights\n\n- Highlight point 1\n- Highlight point 2\n- Highlight point 3\n\n> "Add an inspiring quote or key takeaway about luxury event execution here."\n\n### Conclusion\n\nSummarize the article and key recommendations.`);
    setCoverImage(PRESET_IMAGES[0].url);
    setCategory('Event Trends');
    setCustomCategory('');
    setAuthor('Captive Events Editorial');
    setAuthorRole('Event Specialist');
    setReadTime('5 min read');
    setTags(['Dubai Events', 'Luxury Galas']);
    setTagInput('');
    setIsPublished(true);
    setMetaTitle('');
    setMetaDescription('');
    setEditorTab('content');
    setIsEditorOpen(true);
  };

  // Open Editor for Editing Existing Blog
  const handleOpenEdit = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title || '');
    setSlug(blog.slug || '');
    setIsSlugManual(true);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setCoverImage(blog.coverImage || '');
    if (CATEGORY_PRESETS.includes(blog.category)) {
      setCategory(blog.category);
      setCustomCategory('');
    } else {
      setCategory('Custom');
      setCustomCategory(blog.category || '');
    }
    setAuthor(blog.author || 'Captive Events Editorial');
    setAuthorRole(blog.authorRole || 'Event Specialist');
    setReadTime(blog.readTime || '5 min read');
    setTags(Array.isArray(blog.tags) ? blog.tags : []);
    setTagInput('');
    setIsPublished(blog.isPublished);
    setMetaTitle(blog.metaTitle || '');
    setMetaDescription(blog.metaDescription || '');
    setEditorTab('content');
    setIsEditorOpen(true);
  };

  // Title change with auto-slug
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
  };

  // Tag Handling
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^,|,$/g, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Insert markdown helpers into content
  const insertContentSnippet = (snippet) => {
    setContent((prev) => prev + (prev ? '\n\n' : '') + snippet);
  };

  // Save / Update Blog Submit
  const handleSaveBlog = async (e) => {
    e?.preventDefault();

    if (!title.trim()) {
      showToast('Please enter an article title.', 'error');
      setEditorTab('content');
      return;
    }

    const resolvedSlug = slugify(slug.trim() || title.trim() || `story-${Date.now()}`);
    const resolvedExcerpt = excerpt.trim() || 'Captive Events editorial story and insights.';
    const resolvedContent = content.trim() || 'Article content details coming soon.';
    const resolvedCategory = category === 'Custom' ? (customCategory.trim() || 'General') : category;

    const blogData = {
      title: title.trim(),
      slug: resolvedSlug,
      excerpt: resolvedExcerpt,
      content: resolvedContent,
      coverImage: coverImage.trim() || null,
      category: resolvedCategory,
      author: author.trim() || 'Captive Events Editorial',
      authorRole: authorRole.trim() || 'Event Specialist',
      readTime: readTime.trim() || '5 min read',
      tags,
      isPublished,
      metaTitle: metaTitle.trim() || title.trim(),
      metaDescription: metaDescription.trim() || resolvedExcerpt,
    };

    setIsSubmitting(true);
    try {
      if (editingBlogId) {
        await updateBlog(editingBlogId, blogData);
        showToast('Article updated successfully!', 'success');
      } else {
        await createBlog(blogData);
        showToast('Article published successfully!', 'success');
      }
      setIsEditorOpen(false);
      fetchBlogs();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Toggle Publish Status
  const handleTogglePublish = async (blog) => {
    try {
      const nextStatus = !blog.isPublished;
      await updateBlog(blog.id, { isPublished: nextStatus });
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, isPublished: nextStatus } : b))
      );
      showToast(
        nextStatus ? `"${blog.title}" is now Published live!` : `"${blog.title}" moved to Drafts.`
      );
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Delete Blog
  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await deleteBlog(blogToDelete.id);
      setBlogs((prev) => prev.filter((b) => b.id !== blogToDelete.id));
      showToast(`Article "${blogToDelete.title}" deleted.`, 'success');
      setBlogToDelete(null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Blog List
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Category filter
      if (filterCategory !== 'All' && blog.category !== filterCategory) return false;

      // Status filter
      if (filterStatus === 'Published' && !blog.isPublished) return false;
      if (filterStatus === 'Draft' && blog.isPublished) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = blog.title?.toLowerCase().includes(q);
        const matchesExcerpt = blog.excerpt?.toLowerCase().includes(q);
        const matchesCategory = blog.category?.toLowerCase().includes(q);
        const matchesTags = blog.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesTags) return false;
      }

      return true;
    });
  }, [blogs, filterCategory, filterStatus, searchQuery]);

  // Calculated Stats
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.isPublished).length;
    const drafts = total - published;
    const categoriesCount = new Set(blogs.map((b) => b.category)).size;
    return { total, published, drafts, categoriesCount };
  }, [blogs]);

  // ==========================================
  // VIEW: LOGIN SCREEN IF NOT AUTHENTICATED
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
        <SEO title="Admin Login | Captive Events CMS" noindex={true} />

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[25rem] h-[25rem] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl shadow-black/80"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-red/20 to-brand-orange/20 border border-brand-orange/30 mb-4 shadow-[0_0_20px_rgba(255,140,0,0.2)]">
              <Lock className="w-8 h-8 text-brand-orange" />
            </div>
            <h1 className="text-2xl font-display font-black text-white uppercase tracking-wide">
              Client Portal
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Captive Events — Blog Content Management
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-300 mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter your admin passcode"
                  className="w-full bg-black/40 border border-white/15 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-white rounded-xl px-4 py-3.5 text-sm transition-all outline-none"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl p-3"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Access Blog Manager'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs">
              Need access? Contact the technical director or your system administrator.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN CMS DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-brand-dark text-white relative pb-24">
      <SEO title="Blog CMS Dashboard | Captive Events" noindex={true} />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/30 text-rose-200'
                : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar / Header Bar */}
      <header className="sticky top-0 z-30 bg-brand-black/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <h1 className="text-lg font-display font-black tracking-wide text-white uppercase">
                  Captive Blog CMS
                </h1>
                <p className="text-xs text-gray-400">Client Self-Service Management Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 border border-white/10"
            >
              <ExternalLink size={14} />
              View Public Blog
            </a>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-orange/20 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              Write New Blog
            </button>

            <button
              onClick={handleLogout}
              title="Logout from CMS"
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* KPI Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Stories</span>
            <div className="text-3xl font-display font-black text-white mt-1">{stats.total}</div>
          </div>
          <div className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live &amp; Published</span>
            <div className="text-3xl font-display font-black text-emerald-400 mt-1">{stats.published}</div>
          </div>
          <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Drafts</span>
            <div className="text-3xl font-display font-black text-amber-400 mt-1">{stats.drafts}</div>
          </div>
          <div className="bg-brand-orange/[0.03] border border-brand-orange/20 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Categories</span>
            <div className="text-3xl font-display font-black text-brand-orange mt-1">{stats.categoriesCount}</div>
          </div>
        </div>

        {/* Filter, Search & Status Bar */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
            {['All', 'Published', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Category Dropdown */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-black/40 border border-white/10 text-gray-300 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-brand-orange"
            >
              <option value="All">All Categories</option>
              {CATEGORY_PRESETS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, tags..."
                className="bg-black/40 border border-white/10 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-brand-orange w-full sm:w-64 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={fetchBlogs}
              title="Refresh Blogs"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
            >
              <RefreshCw size={15} className={isLoading ? 'animate-spin text-brand-orange' : ''} />
            </button>
          </div>
        </div>

        {/* Blogs List */}
        {isLoading && blogs.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-3xl">
            <RefreshCw className="w-8 h-8 text-brand-orange animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading articles from database...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-3xl p-6">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery || filterCategory !== 'All' || filterStatus !== 'All'
                ? 'Try adjusting your search terms or filters.'
                : 'You have not added any articles yet. Create your first blog post now!'}
            </p>
            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
            >
              Create First Article
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0 relative">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
                        {blog.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          blog.isPublished
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Clock size={12} /> {blog.readTime || '5 min read'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-orange transition-colors truncate">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-xs line-clamp-1 mt-1 font-light">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-2">
                      <span>By {blog.author}</span>
                      <span>•</span>
                      <span>
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }) : 'Recent'}
                      </span>
                      <span>•</span>
                      <span className="text-gray-600 font-mono">/blogs/{blog.slug}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/5 shrink-0">
                  {/* Toggle publish button */}
                  <button
                    onClick={() => handleTogglePublish(blog)}
                    title={blog.isPublished ? 'Unpublish to Draft' : 'Publish Live'}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      blog.isPublished
                        ? 'bg-white/5 border-white/10 hover:border-amber-500/40 text-gray-300 hover:text-amber-400'
                        : 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {blog.isPublished ? 'Move to Draft' : 'Publish'}
                  </button>

                  {/* Preview Button */}
                  <button
                    onClick={() => setPreviewBlog(blog)}
                    title="Quick Preview"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <Eye size={16} />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEdit(blog)}
                    title="Edit Story"
                    className="p-2 rounded-xl bg-white/5 hover:bg-brand-orange/20 text-gray-400 hover:text-brand-orange border border-white/10 transition-colors cursor-pointer"
                  >
                    <Edit3 size={16} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setBlogToDelete(blog)}
                    title="Delete Story"
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* MODAL: FULL BLOG BUILDER & EDITOR         */}
      {/* ========================================== */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl bg-brand-black border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center text-white">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {editingBlogId ? 'Edit Article' : 'Write New Article'}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Captive Events Editorial Publishing System
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditorTab('content')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      editorTab === 'content' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('seo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      editorTab === 'seo' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    SEO &amp; Meta
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('preview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      editorTab === 'preview' ? 'bg-brand-orange text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Eye size={12} />
                    Live Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* TAB 1: CONTENT */}
                {editorTab === 'content' && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="e.g., Luxury Event Trends in Dubai for 2026"
                        className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-4 py-3 text-base font-semibold outline-none transition-all"
                      />
                    </div>

                    {/* Category & Read Time & Author Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                          Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-3 py-2.5 text-xs outline-none"
                        >
                          {CATEGORY_PRESETS.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                          <option value="Custom">+ Custom Category</option>
                        </select>
                        {category === 'Custom' && (
                          <input
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            placeholder="Type custom category name"
                            className="mt-2 w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-3 py-2 text-xs outline-none"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="e.g., Captive Events Editorial"
                          className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-3 py-2.5 text-xs outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          placeholder="e.g., 5 min read"
                          className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-3 py-2.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Cover Image URL & Presets */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          Featured Cover Image *
                        </label>
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all">
                            <Plus size={14} />
                            <UploadCloud size={14} />
                            Upload Cover Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleLocalImageUpload(e, 'cover')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://images.unsplash.com/... or upload image above"
                        className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-4 py-2.5 text-xs outline-none"
                      />

                      {/* Presets Picker */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-gray-500">Quick Presets:</span>
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.label}
                            type="button"
                            onClick={() => setCoverImage(img.url)}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-[10px] font-medium border border-white/10 transition-colors cursor-pointer"
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>

                      {/* Image Preview */}
                      {coverImage && (
                        <div className="mt-3 w-full h-44 rounded-2xl overflow-hidden bg-black/60 border border-white/10 relative">
                          <img
                            src={coverImage}
                            alt="Cover Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Excerpt / Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          Short Summary / Excerpt *
                        </label>
                        <span className="text-[11px] text-gray-400">
                          {excerpt.length} characters (120-160 recommended for Google snippet)
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="A captivating 1-2 sentence preview that appears on blog cards and search engines..."
                        className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-4 py-3 text-xs outline-none leading-relaxed resize-none"
                      />
                    </div>

                    {/* Article Body Editor with Formatting Bar */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          Article Body Content *
                        </label>
                        
                        {/* Formatting Quick Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/10">
                          {/* BIG DEDICATED + ADD IMAGE BUTTON */}
                          <button
                            type="button"
                            onClick={() => {
                              setImageTarget('body');
                              setNewImageUrl('');
                              setNewImageCaption('');
                              setIsImageModalOpen(true);
                            }}
                            className="px-3 py-1 rounded-lg bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-orange/20 hover:brightness-110 transition-all cursor-pointer"
                          >
                            <Plus size={14} />
                            <ImageIcon size={14} />
                            Add Image
                          </button>

                          <div className="w-[1px] h-4 bg-white/20 mx-1" />

                          <button
                            type="button"
                            onClick={() => insertContentSnippet('## Section Heading')}
                            title="Insert Heading 2"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Heading2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertContentSnippet('### Sub-Heading')}
                            title="Insert Subheading 3"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Heading3 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertContentSnippet('> "Luxury event quote or key insight here."')}
                            title="Insert Quote Callout"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Quote size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertContentSnippet('- Point one\n- Point two\n- Point three')}
                            title="Insert Bullet List"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <List size={13} />
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={14}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write the full story here using headings, bullet points, quotes..."
                        className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl p-4 text-xs font-mono leading-relaxed outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: SEO & METADATA */}
                {editorTab === 'seo' && (
                  <div className="space-y-6">
                    {/* Slug */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          URL Slug *
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setSlug(slugify(title));
                            setIsSlugManual(false);
                          }}
                          className="text-[11px] text-brand-orange hover:underline cursor-pointer"
                        >
                          Regenerate from title
                        </button>
                      </div>
                      <div className="flex items-center bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs">
                        <span className="text-gray-500 select-none">captiveevents.com/blogs/</span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => {
                            setSlug(slugify(e.target.value));
                            setIsSlugManual(true);
                          }}
                          placeholder="url-friendly-slug"
                          className="bg-transparent text-white font-mono flex-1 outline-none ml-1"
                        />
                      </div>
                    </div>

                    {/* Google SERP Preview Card */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                        Google Search Snippet Preview
                      </span>
                      <div className="bg-[#121212] p-4 rounded-xl border border-white/5 max-w-xl">
                        <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1 font-mono">
                          <Globe size={12} className="text-brand-orange" />
                          <span>https://captiveevents.com &gt; blogs &gt; {slug || 'article-slug'}</span>
                        </div>
                        <div className="text-base text-[#8ab4f8] hover:underline font-medium cursor-pointer">
                          {metaTitle || title || 'Your Article Title | Captive Events Dubai'}
                        </div>
                        <div className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                          {metaDescription || excerpt || 'Your meta description will appear here on search results pages to attract visitors...'}
                        </div>
                      </div>
                    </div>

                    {/* Meta Title */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          SEO Meta Title
                        </label>
                        <span className="text-[11px] text-gray-400">
                          {(metaTitle || title).length} / 60 recommended
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder={title || 'Leave blank to use article title'}
                        className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-4 py-2.5 text-xs outline-none"
                      />
                    </div>

                    {/* Meta Description */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          SEO Meta Description
                        </label>
                        <span className="text-[11px] text-gray-400">
                          {(metaDescription || excerpt).length} / 160 recommended
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder={excerpt || 'Leave blank to use excerpt'}
                        className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-4 py-2.5 text-xs outline-none resize-none"
                      />
                    </div>

                    {/* Tags Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                        Tags (Press Enter or comma to add)
                      </label>
                      <div className="flex flex-wrap items-center gap-2 bg-black/40 border border-white/15 rounded-xl p-3">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white/10 text-gray-200 border border-white/10"
                          >
                            <Tag size={11} className="text-brand-orange" />
                            {t}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(t)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="Type tag and press Enter..."
                          className="bg-transparent text-white text-xs outline-none flex-1 min-w-[140px]"
                        />
                      </div>
                    </div>

                    {/* Publish Status Toggle */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white">
                          Publish Status
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {isPublished
                            ? 'Visible immediately to public visitors at /blogs/' + (slug || '')
                            : 'Saved as a draft. Only visible inside this admin portal.'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsPublished(!isPublished)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                          isPublished ? 'bg-gradient-to-r from-brand-red to-brand-orange' : 'bg-white/10'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            isPublished ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 3: LIVE PREVIEW */}
                {editorTab === 'preview' && (
                  <div className="space-y-6 max-w-3xl mx-auto py-4">
                    <div className="p-3 bg-brand-orange/10 border border-brand-orange/30 rounded-xl text-center text-xs text-brand-orange font-medium">
                      Live Preview Mode: This is how your article will look to visitors on Captive Events
                    </div>

                    {/* Article Header */}
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] text-brand-orange border border-brand-orange/30 bg-brand-orange/10 mb-4">
                        {category}
                      </span>
                      <h1 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight mb-4">
                        {title || 'Untitled Article'}
                      </h1>
                      <p className="text-gray-300 text-sm max-w-xl mx-auto mb-4 font-light">
                        {excerpt || 'Article summary preview will appear here.'}
                      </p>
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                        <span>By {author}</span>
                        <span>•</span>
                        <span>{readTime}</span>
                        <span>•</span>
                        <span>Today</span>
                      </div>
                    </div>

                    {/* Cover Photo */}
                    {coverImage && (
                      <div className="rounded-2xl overflow-hidden border border-white/10 h-72 w-full">
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Formatted Content */}
                    <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-4 pt-4 border-t border-white/10">
                      {content.split('\n\n').map((block, idx) => {
                        if (block.startsWith('## ')) {
                          return (
                            <h2 key={idx} className="text-xl font-bold text-white mt-6 mb-2 border-b border-white/10 pb-2">
                              {block.replace('## ', '')}
                            </h2>
                          );
                        }
                        if (block.startsWith('### ')) {
                          return (
                            <h3 key={idx} className="text-base font-bold text-brand-orange mt-4 mb-2">
                              {block.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (block.startsWith('> ')) {
                          return (
                            <blockquote key={idx} className="border-l-4 border-brand-orange bg-brand-orange/5 p-4 rounded-r-xl italic text-gray-200">
                              {block.replace('> ', '').replace(/^"|"$/g, '')}
                            </blockquote>
                          );
                        }
                        if (block.startsWith('- ')) {
                          const items = block.split('\n').map((l) => l.replace(/^- /, ''));
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-1.5">
                              {items.map((it, i) => (
                                <li key={i}>{it}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={idx}>{block}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPublished(false);
                      handleSaveBlog();
                    }}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer"
                  >
                    Save Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPublished(true);
                      handleSaveBlog();
                    }}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-orange/25 cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        Publish Article
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* MODAL: DELETE CONFIRMATION                 */}
      {/* ========================================== */}
      <AnimatePresence>
        {blogToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-brand-black border border-white/15 rounded-3xl p-6 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Delete Article?</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                Are you sure you want to permanently delete{' '}
                <span className="text-white font-semibold">"{blogToDelete.title}"</span>?
                This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* MODAL: QUICK PREVIEW                       */}
      {/* ========================================== */}
      <AnimatePresence>
        {previewBlog && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-brand-black border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setPreviewBlog(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
                  {previewBlog.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-3">
                {previewBlog.title}
              </h2>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {previewBlog.excerpt}
              </p>

              {previewBlog.coverImage && (
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={previewBlog.coverImage}
                    alt={previewBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-invert max-w-none text-gray-300 text-xs leading-relaxed space-y-4">
                {previewBlog.content.split('\n\n').map((block, i) => (
                  <p key={i}>{block}</p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* MODAL: DEDICATED IMAGE INSERTER (+ ICON)   */}
      {/* ========================================== */}
      <AnimatePresence>
        {isImageModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-brand-black border border-white/15 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center text-white">
                    <Plus size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {imageTarget === 'cover' ? 'Set Cover Image' : 'Add Image to Article'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Upload from your device, paste a URL, or pick a preset
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Source Mode Tabs */}
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 mb-5">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    imageTab === 'upload' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <UploadCloud size={14} />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    imageTab === 'url' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe size={14} />
                  Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('presets')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    imageTab === 'presets' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={14} />
                  Presets
                </button>
              </div>

              {/* TAB 1: FILE UPLOAD */}
              {imageTab === 'upload' && (
                <div className="space-y-4">
                  <label className="border-2 border-dashed border-white/20 hover:border-brand-orange/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white/[0.01] hover:bg-white/[0.03]">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red/20 to-brand-orange/20 border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-3">
                      <Plus size={24} />
                    </div>
                    <span className="text-sm font-bold text-white mb-1">
                      Click to choose an image from your computer
                    </span>
                    <span className="text-xs text-gray-400">
                      Supports JPG, PNG, WEBP (Max 10MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* TAB 2: PASTE URL */}
              {imageTab === 'url' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Image Web Address (URL)
                    </label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-4 py-3 text-xs outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: PRESETS */}
              {imageTab === 'presets' && (
                <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setNewImageUrl(img.url)}
                      className={`group relative rounded-xl overflow-hidden border text-left p-2 transition-all cursor-pointer ${
                        newImageUrl === img.url
                          ? 'border-brand-orange bg-brand-orange/10'
                          : 'border-white/10 hover:border-white/30 bg-black/40'
                      }`}
                    >
                      <div className="h-20 rounded-lg overflow-hidden mb-1.5">
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <span className="text-[10px] font-bold text-white line-clamp-1">{img.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* THUMBNAIL PREVIEW */}
              {newImageUrl && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Image Preview:
                  </span>
                  <div className="h-36 rounded-xl overflow-hidden border border-white/15 bg-black/60 relative">
                    <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {/* Caption Input for Body Images */}
              {imageTarget === 'body' && (
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Image Caption / Alt Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={newImageCaption}
                    onChange={(e) => setNewImageCaption(e.target.value)}
                    placeholder="e.g., Luxury gala lighting at Palm Jumeirah"
                    className="w-full bg-black/40 border border-white/15 focus:border-brand-orange text-white rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleInsertImageToArticle}
                  disabled={!newImageUrl}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-orange/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} />
                  Insert Image into Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogCMS;
