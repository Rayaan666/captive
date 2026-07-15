import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    const normalizedOrigin = origin?.replace(/\/$/, '');
    const isLocalDevelopmentOrigin = (() => {
      if (!origin || env.nodeEnv === 'production') return false;
      try {
        return ['localhost', '127.0.0.1', '::1'].includes(new URL(origin).hostname);
      } catch {
        return false;
      }
    })();

    if (!origin || env.clientOrigins.includes(normalizedOrigin) || isLocalDevelopmentOrigin) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS.'));
  },
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '32kb' }));

app.use('/api/payments', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many payment requests. Please try again later.' },
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/payments', paymentRoutes);
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
