import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import { env } from '../config/env.js';

const dataDirectory = fileURLToPath(new URL('../data', import.meta.url));
const dataFile = fileURLToPath(new URL('../data/blogs.json', import.meta.url));
const temporaryFile = `${dataFile}.tmp`;

const useSupabase = Boolean(env.supabaseUrl && env.supabaseServerKey);
const isModernSecretKey = env.supabaseServerKey?.startsWith('sb_secret_');

const supabaseClient = useSupabase
  ? axios.create({
      baseURL: `${env.supabaseUrl}/rest/v1`,
      timeout: env.requestTimeoutMs,
      headers: {
        apikey: env.supabaseServerKey,
        ...(!isModernSecretKey ? { Authorization: `Bearer ${env.supabaseServerKey}` } : {}),
        'Content-Type': 'application/json',
      },
    })
  : null;

// Map Supabase snake_case row to camelCase JS object
const normalizeRow = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  coverImage: row.cover_image,
  category: row.category,
  author: row.author,
  authorRole: row.author_role,
  readTime: row.read_time,
  tags: Array.isArray(row.tags) ? row.tags : (typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : []),
  isPublished: Boolean(row.is_published),
  metaTitle: row.meta_title,
  metaDescription: row.meta_description,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Map JS object to Supabase snake_case row
const toDatabaseRow = (blog) => {
  const row = {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    cover_image: blog.coverImage ?? null,
    category: blog.category ?? 'Event Trends',
    author: blog.author ?? 'Captive Events Editorial',
    author_role: blog.authorRole ?? 'Event Specialist',
    read_time: blog.readTime ?? '5 min read',
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    is_published: blog.isPublished !== undefined ? Boolean(blog.isPublished) : true,
    meta_title: blog.metaTitle ?? null,
    meta_description: blog.metaDescription ?? null,
    updated_at: new Date().toISOString(),
  };
  if (blog.createdAt) row.created_at = blog.createdAt;
  if (blog.id && !blog.id.startsWith('b00')) row.id = blog.id;
  return row;
};

// Serialize local file writes
let operationQueue = Promise.resolve();
const withWriteLock = (operation) => {
  const result = operationQueue.then(operation, operation);
  operationQueue = result.then(() => undefined, () => undefined);
  return result;
};

const readLocalBlogs = async () => {
  try {
    const raw = await readFile(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeLocalBlogs = async (blogs) => {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(temporaryFile, JSON.stringify(blogs, null, 2), 'utf8');
  await rename(temporaryFile, dataFile);
};

// Public: Get all published blogs
export const getPublishedBlogs = async ({ category, search, limit } = {}) => {
  if (useSupabase) {
    try {
      let query = '/blogs?is_published=eq.true&order=created_at.desc';
      if (category && category.toLowerCase() !== 'all') {
        query += `&category=eq.${encodeURIComponent(category)}`;
      }
      if (search) {
        query += `&or=(title.ilike.*${encodeURIComponent(search)}*,excerpt.ilike.*${encodeURIComponent(search)}*)`;
      }
      if (limit) {
        query += `&limit=${Number(limit)}`;
      }

      const { data } = await supabaseClient.get(query);
      return data.map(normalizeRow);
    } catch (error) {
      console.warn('Supabase fetch failed for blogs, using local fallback:', error.message);
    }
  }

  // Fallback to local JSON
  const blogs = await readLocalBlogs();
  let filtered = blogs.filter((b) => b.isPublished);

  if (category && category.toLowerCase() !== 'all') {
    filtered = filtered.filter((b) => b.category?.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter((b) => 
      b.title?.toLowerCase().includes(query) || 
      b.excerpt?.toLowerCase().includes(query) ||
      b.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }

  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return limit ? filtered.slice(0, Number(limit)) : filtered;
};

// Public: Get single published blog by slug
export const getBlogBySlug = async (slug) => {
  if (useSupabase) {
    try {
      const { data } = await supabaseClient.get(
        `/blogs?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`
      );
      if (data && data[0]) return normalizeRow(data[0]);
    } catch (error) {
      console.warn(`Supabase fetch by slug failed for ${slug}, using local fallback:`, error.message);
    }
  }

  const blogs = await readLocalBlogs();
  return blogs.find((b) => b.slug === slug) ?? null;
};

// Admin: Get all blogs (published + drafts)
export const getAllBlogsAdmin = async () => {
  if (useSupabase) {
    try {
      const { data } = await supabaseClient.get('/blogs?order=created_at.desc');
      return data.map(normalizeRow);
    } catch (error) {
      console.warn('Supabase admin fetch failed for blogs, using local fallback:', error.message);
    }
  }

  const blogs = await readLocalBlogs();
  return [...blogs].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
};

// Admin: Create a new blog post
export const createBlog = async (blogInput) => {
  const now = new Date().toISOString();
  const id = randomUUID();
  const record = {
    id,
    slug: blogInput.slug,
    title: blogInput.title,
    excerpt: blogInput.excerpt || '',
    content: blogInput.content || '',
    coverImage: blogInput.coverImage || null,
    category: blogInput.category || 'Event Trends',
    author: blogInput.author || 'Captive Events Editorial',
    authorRole: blogInput.authorRole || 'Event Specialist',
    readTime: blogInput.readTime || '5 min read',
    tags: Array.isArray(blogInput.tags) ? blogInput.tags : [],
    isPublished: blogInput.isPublished !== undefined ? Boolean(blogInput.isPublished) : true,
    metaTitle: blogInput.metaTitle || blogInput.title,
    metaDescription: blogInput.metaDescription || blogInput.excerpt || '',
    createdAt: now,
    updatedAt: now,
  };

  if (useSupabase) {
    try {
      const dbRow = toDatabaseRow(record);
      dbRow.id = id;
      dbRow.created_at = now;

      const { data } = await supabaseClient.post('/blogs', dbRow, {
        headers: { Prefer: 'return=representation' },
      });
      if (data && data[0]) return normalizeRow(data[0]);
    } catch (error) {
      console.warn('Supabase create failed for blog, persisting locally:', error.message);
    }
  }

  return withWriteLock(async () => {
    const blogs = await readLocalBlogs();
    blogs.unshift(record);
    await writeLocalBlogs(blogs);
    return record;
  });
};

// Admin: Update an existing blog
export const updateBlog = async (id, updates) => {
  const now = new Date().toISOString();

  if (useSupabase) {
    try {
      const mapped = toDatabaseRow(updates);
      mapped.updated_at = now;
      delete mapped.id;

      const { data } = await supabaseClient.patch(
        `/blogs?id=eq.${encodeURIComponent(id)}`,
        mapped,
        { headers: { Prefer: 'return=representation' } }
      );
      if (data && data[0]) return normalizeRow(data[0]);
    } catch (error) {
      console.warn(`Supabase update failed for ${id}, updating locally:`, error.message);
    }
  }

  return withWriteLock(async () => {
    const blogs = await readLocalBlogs();
    const index = blogs.findIndex((b) => b.id === id || b.slug === id);
    if (index === -1) return null;

    blogs[index] = {
      ...blogs[index],
      ...updates,
      updatedAt: now,
    };
    await writeLocalBlogs(blogs);
    return blogs[index];
  });
};

// Admin: Delete a blog post
export const deleteBlog = async (id) => {
  if (useSupabase) {
    try {
      await supabaseClient.delete(`/blogs?id=eq.${encodeURIComponent(id)}`);
      return true;
    } catch (error) {
      console.warn(`Supabase delete failed for ${id}, deleting locally:`, error.message);
    }
  }

  return withWriteLock(async () => {
    const blogs = await readLocalBlogs();
    const filtered = blogs.filter((b) => b.id !== id && b.slug !== id);
    if (filtered.length === blogs.length) return false;
    await writeLocalBlogs(filtered);
    return true;
  });
};
