import axios from 'axios';

const ADMIN_TOKEN_KEY = 'captive_blog_admin_token';

const blogClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20_000,
});

// Attach Authorization header if admin token exists
blogClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getErrorMessage = (error) => {
  if (error.code === 'ECONNABORTED') {
    return 'The request timed out. Please try again.';
  }
  return error.response?.data?.message || error.message || 'An unexpected error occurred.';
};

// Token helpers
export const getStoredAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setStoredAdminToken = (token) => {
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
};

export const clearStoredAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

// Public Endpoints
export const getPublishedBlogs = async ({ category, search, limit } = {}) => {
  try {
    const params = {};
    if (category && category !== 'All') params.category = category;
    if (search) params.search = search;
    if (limit) params.limit = limit;

    const response = await blogClient.get('/blogs', { params });
    return response.data?.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await blogClient.get(`/blogs/${encodeURIComponent(slug)}`);
    return response.data?.data || null;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

// Admin Endpoints
export const loginAdmin = async (passcode) => {
  try {
    const response = await blogClient.post('/blogs/auth', { passcode });
    const token = response.data?.token;
    if (token) {
      setStoredAdminToken(token);
    }
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const getAdminBlogs = async () => {
  try {
    const response = await blogClient.get('/blogs/admin/all');
    return response.data?.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await blogClient.post('/blogs', blogData);
    return response.data?.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const response = await blogClient.put(`/blogs/${encodeURIComponent(id)}`, blogData);
    return response.data?.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await blogClient.delete(`/blogs/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const uploadBlogImage = async (imagePayload, filename = 'photo.jpg') => {
  try {
    const response = await blogClient.post('/blogs/upload-image', { image: imagePayload, filename });
    return response.data?.url || imagePayload;
  } catch (error) {
    console.warn('Cloud storage image upload fallback:', error.message);
    return imagePayload;
  }
};
