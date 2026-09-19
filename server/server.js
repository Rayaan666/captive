import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());

const allowedOrigins = new Set([
  ...env.clientOrigins,
  'https://captiveevents.com',
  'https://www.captiveevents.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.has(normalizedOrigin)) {
      return callback(null, true);
    }

    try {
      const parsed = new URL(origin);
      // Always allow local development origins regardless of NODE_ENV
      if (['localhost', '127.0.0.1', '::1'].includes(parsed.hostname)) {
        return callback(null, true);
      }
      // Allow Netlify deploy previews
      if (parsed.hostname.endsWith('.netlify.app')) {
        return callback(null, true);
      }
    } catch {
      // Invalid URL syntax
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-ngenius-webhook-token'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/payments', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many payment requests. Please try again later.' },
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use(notFound);
app.use(errorHandler);

export const server = app.listen(env.port, () => {
  console.log(`Payment API listening on http://localhost:${env.port}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Closing the payment API.`);
  server.close(() => process.exit(0));
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
