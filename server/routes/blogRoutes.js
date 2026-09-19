import { Router } from 'express';
import {
  adminAuth,
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getBlogBySlug,
  getBlogs,
  requireAdmin,
  updateBlog,
} from '../controllers/blogController.js';

const router = Router();

// Public routes
router.get('/', getBlogs);
router.post('/auth', adminAuth);

// Admin-only collection routes
router.get('/admin/all', requireAdmin, getAdminBlogs);
router.post('/', requireAdmin, createBlog);

// Admin-only member routes
router.put('/:id', requireAdmin, updateBlog);
router.delete('/:id', requireAdmin, deleteBlog);

// Public single blog (must be placed after specific routes to avoid matching /admin/all)
router.get('/:slug', getBlogBySlug);

export default router;
