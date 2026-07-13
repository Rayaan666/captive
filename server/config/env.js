import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

// Load the backend-only environment file regardless of the process working directory.
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });

const environmentSchema = z.object({
  NGENIUS_API_KEY: z.string().trim().min(1, 'NGENIUS_API_KEY is required'),
  NGENIUS_OUTLET_ID: z.string().trim().min(1, 'NGENIUS_OUTLET_ID is required'),
  NGENIUS_TOKEN_URL: z.url(),
  NGENIUS_API_BASE_URL: z.url(),
  CLIENT_URL: z.string().trim().min(1).default('http://localhost:5173'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  PAYMENT_CURRENCY: z.string().trim().length(3).transform((value) => value.toUpperCase()).default('AED'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  const messages = parsedEnvironment.error.issues.map((issue) => issue.message).join(', ');
  throw new Error(`Invalid server environment: ${messages}`);
}

const values = parsedEnvironment.data;

export const env = Object.freeze({
  apiKey: values.NGENIUS_API_KEY,
  outletId: values.NGENIUS_OUTLET_ID,
  tokenUrl: values.NGENIUS_TOKEN_URL,
  apiBaseUrl: values.NGENIUS_API_BASE_URL.replace(/\/$/, ''),
  clientOrigins: values.CLIENT_URL.split(',').map((origin) => origin.trim().replace(/\/$/, '')),
  port: values.PORT,
  currency: values.PAYMENT_CURRENCY,
  nodeEnv: values.NODE_ENV,
  requestTimeoutMs: 15_000,
});
