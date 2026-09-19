import { createHmac } from 'node:crypto';
import { z } from 'zod';
import { env } from '../config/env.js';
import * as blogRepository from '../repositories/blogRepository.js';
import { ApiError } from '../utils/ApiError.js';

// Admin Token Utilities using HMAC-SHA256
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export const generateAdminToken = () => {
  const payload = {
    role: 'blog_admin',
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', env.adminPasscode)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
};

export const verifyAdminToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [encodedPayload, signature] = parts;

  const expectedSignature = createHmac('sha256', env.adminPasscode)
    .update(encodedPayload)
    .digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) return false;
    return payload.role === 'blog_admin';
  } catch {
    return false;
  }
};

// Express Middleware for Admin Auth
export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!verifyAdminToken(token)) {
    return next(new ApiError(401, 'Unauthorized. Please login with a valid admin passcode.'));
  }
  next();
};

// Zod Validation Schema for Blog Creation & Updates
const blogSchema = z.object({
  title: z.string().trim().min(1, 'Please enter an article title'),
  slug: z.string().trim().optional().nullable().transform((val) => {
    if (!val) return '';
    return val.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }),
  excerpt: z.string().trim().optional().nullable().default('No summary provided.'),
  content: z.string().trim().optional().nullable().default(''),
  coverImage: z.string().trim().optional().nullable().or(z.literal('')),
  category: z.string().trim().optional().nullable().default('Event Trends'),
  author: z.string().trim().optional().nullable().default('Captive Events Editorial'),
  authorRole: z.string().trim().optional().nullable().default('Event Specialist'),
  readTime: z.string().trim().optional().nullable().default('5 min read'),
  tags: z.array(z.string().trim()).optional().default([]),
  isPublished: z.boolean().optional().default(true),
  metaTitle: z.string().trim().optional().nullable(),
  metaDescription: z.string().trim().optional().nullable(),
});

// Controllers
export const getBlogs = async (req, res, next) => {
  try {
    const { category, search, limit } = req.query;
    const blogs = await blogRepository.getPublishedBlogs({ category, search, limit });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await blogRepository.getBlogBySlug(slug);
    if (!blog || (!blog.isPublished && !req.headers.authorization)) {
      throw new ApiError(404, 'Blog post not found.');
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const { passcode } = req.body || {};
    const expectedPasscode = (env.adminPasscode || 'captive-admin-2026').trim();
    const providedPasscode = (passcode || '').trim();

    if (!providedPasscode || providedPasscode !== expectedPasscode) {
      throw new ApiError(401, 'Invalid admin passcode.');
    }
    const token = generateAdminToken();
    res.json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      expiresIn: TOKEN_TTL_MS,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await blogRepository.getAllBlogsAdmin();
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const validated = blogSchema.parse(req.body);
    
    // Auto-generate slug from title if empty
    let finalSlug = validated.slug || validated.title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!finalSlug) finalSlug = `article-${Date.now()}`;

    // Auto-resolve duplicate slugs by appending unique suffix
    let counter = 1;
    let candidateSlug = finalSlug;
    while (await blogRepository.getBlogBySlug(candidateSlug)) {
      candidateSlug = `${finalSlug}-${counter}`;
      counter += 1;
    }
    validated.slug = candidateSlug;

    const created = await blogRepository.createBlog(validated);
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: created,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((i) => i.message).join(', ');
      return next(new ApiError(400, `Validation error: ${messages}`));
    }
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = blogSchema.partial().parse(req.body);

    if (validated.slug) {
      const existing = await blogRepository.getBlogBySlug(validated.slug);
      if (existing && existing.id !== id && existing.slug !== id) {
        throw new ApiError(409, `A blog with the slug "${validated.slug}" already exists.`);
      }
    }

    const updated = await blogRepository.updateBlog(id, validated);
    if (!updated) {
      throw new ApiError(404, 'Blog post not found.');
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((i) => i.message).join(', ');
      return next(new ApiError(400, `Validation error: ${messages}`));
    }
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await blogRepository.deleteBlog(id);
    if (!deleted) {
      throw new ApiError(404, 'Blog post not found.');
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
