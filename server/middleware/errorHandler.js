import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, res) => {
  res.status(404).json({ message: 'API endpoint not found.' });
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const isKnownError = error instanceof ApiError;
  const statusCode = isKnownError ? error.statusCode : 500;

  if (!isKnownError) {
    console.error('Unhandled server error', error);
  }

  res.status(statusCode).json({
    message: isKnownError ? error.message : 'An unexpected server error occurred.',
    ...(isKnownError && error.details ? { errors: error.details } : {}),
  });
};
