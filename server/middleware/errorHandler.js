import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, res) => {
  res.status(404).json({ message: 'API endpoint not found.' });
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const statusCode = error.statusCode || (error instanceof ApiError ? error.statusCode : 500);
  const message = error.message || 'An unexpected server error occurred.';

  if (statusCode >= 500) {
    console.error('Unhandled server error:', error);
  }

  res.status(statusCode).json({
    message,
    ...(error.details ? { errors: error.details } : {}),
  });
};
