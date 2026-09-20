import {
  generateAdminToken,
  verifyAdminToken,
} from '../../server/controllers/blogController.js';
import * as blogRepository from '../../server/repositories/blogRepository.js';
import { env } from '../../server/config/env.js';
import { ApiError } from '../../server/utils/ApiError.js';

const responseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: responseHeaders,
});

const readJson = async (request) => {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, 'Request body must be valid JSON.');
  }
};

const getBearerToken = (request) => {
  const header = request.headers.get('authorization') || request.headers.get('Authorization');
  return header?.startsWith('Bearer ') ? header.slice(7).trim() : null;
};

export default async (request, context) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  try {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '');

    // Public: List blogs
    if (request.method === 'GET' && pathname === '/api/blogs') {
      const category = url.searchParams.get('category');
      const search = url.searchParams.get('search');
      const limit = url.searchParams.get('limit');
      const blogs = await blogRepository.getPublishedBlogs({ category, search, limit });
      return json({ success: true, count: blogs.length, data: blogs });
    }

    // Admin: Auth
    if (request.method === 'POST' && pathname === '/api/blogs/auth') {
      const body = await readJson(request);
      const expectedPasscode = (env.adminPasscode || 'captive-admin-2026').trim();
      const providedPasscode = (body.passcode || '').trim();

      if (!providedPasscode || providedPasscode !== expectedPasscode) {
        throw new ApiError(401, 'Invalid admin passcode.');
      }
      return json({
        success: true,
        message: 'Admin authenticated successfully',
        token: generateAdminToken(),
      });
    }

    // Admin: Get all blogs (including drafts)
    if (request.method === 'GET' && pathname === '/api/blogs/admin/all') {
      if (!verifyAdminToken(getBearerToken(request))) {
        throw new ApiError(401, 'Unauthorized admin request.');
      }
      const blogs = await blogRepository.getAllBlogsAdmin();
      return json({ success: true, count: blogs.length, data: blogs });
    }

    // Admin: Create blog
    if (request.method === 'POST' && pathname === '/api/blogs') {
      if (!verifyAdminToken(getBearerToken(request))) {
        throw new ApiError(401, 'Unauthorized admin request.');
      }
      const body = await readJson(request);
      const created = await blogRepository.createBlog(body);
      return json({ success: true, message: 'Blog post created successfully', data: created }, 201);
    }

    // Admin: Upload image to Cloud Storage
    if (request.method === 'POST' && pathname === '/api/blogs/upload-image') {
      if (!verifyAdminToken(getBearerToken(request))) {
        throw new ApiError(401, 'Unauthorized admin request.');
      }
      const body = await readJson(request);
      if (!body.image) throw new ApiError(400, 'Image data is required.');
      const publicUrl = await blogRepository.uploadImageToStorage(body.image, body.filename || 'photo.jpg');
      return json({ success: true, message: 'Image uploaded to cloud storage successfully', url: publicUrl });
    }

    // Single item operations: /api/blogs/:slugOrId
    const pathParts = pathname.split('/');
    if (pathParts.length === 4 && pathParts[1] === 'api' && pathParts[2] === 'blogs') {
      const slugOrId = decodeURIComponent(pathParts[3]);

      if (request.method === 'GET') {
        const blog = await blogRepository.getBlogBySlug(slugOrId);
        if (!blog) throw new ApiError(404, 'Blog post not found.');
        return json({ success: true, data: blog });
      }

      if (request.method === 'PUT') {
        if (!verifyAdminToken(getBearerToken(request))) {
          throw new ApiError(401, 'Unauthorized admin request.');
        }
        const body = await readJson(request);
        const updated = await blogRepository.updateBlog(slugOrId, body);
        if (!updated) throw new ApiError(404, 'Blog post not found.');
        return json({ success: true, message: 'Blog post updated successfully', data: updated });
      }

      if (request.method === 'DELETE') {
        if (!verifyAdminToken(getBearerToken(request))) {
          throw new ApiError(401, 'Unauthorized admin request.');
        }
        const deleted = await blogRepository.deleteBlog(slugOrId);
        if (!deleted) throw new ApiError(404, 'Blog post not found.');
        return json({ success: true, message: 'Blog post deleted successfully' });
      }
    }

    return json({ message: 'Blog API endpoint not found.' }, 404);
  } catch (error) {
    const isKnownError = error instanceof ApiError;
    if (!isKnownError) console.error('Unhandled blog function error:', error);

    return json({
      message: isKnownError ? error.message : 'An unexpected blog service error occurred.',
    }, isKnownError ? error.statusCode : 500);
  }
};

export const config = {
  path: [
    '/api/blogs',
    '/api/blogs/auth',
    '/api/blogs/admin/all',
    '/api/blogs/upload-image',
    '/api/blogs/:slugOrId',
  ],
};
