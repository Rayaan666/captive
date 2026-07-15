import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const optional = (schema) => z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  schema.optional(),
);

// Load the backend-only environment file regardless of the process working directory.
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });

const environmentSchema = z.object({
  NGENIUS_API_KEY: z.string().trim().min(1, 'NGENIUS_API_KEY is required'),
  NGENIUS_OUTLET_ID: z.string().trim().min(1, 'NGENIUS_OUTLET_ID is required'),
  NGENIUS_TOKEN_URL: z.url(),
  NGENIUS_API_BASE_URL: z.url(),
  NGENIUS_REALM: z.string().trim().min(1).default('ni'),
  NGENIUS_WEBHOOK_HEADER: z.string().trim().min(1).default('x-ngenius-webhook-token'),
  NGENIUS_WEBHOOK_SECRET: optional(z.string().trim().min(16)),
  CLIENT_URL: z.string().trim().min(1).default('http://localhost:5173'),
  PAYMENT_REDIRECT_URL: optional(z.url()),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  PAYMENT_CURRENCY: z.string().trim().length(3).transform((value) => value.toUpperCase()).default('AED'),
  BOOKING_DEPOSIT_AED: z.coerce.number().positive().max(9_999_999).default(1000),
  SUPABASE_URL: optional(z.url()),
  SUPABASE_SECRET_KEY: optional(z.string().trim().min(1)),
  SUPABASE_SERVICE_ROLE_KEY: optional(z.string().trim().min(1)),
  RESEND_API_KEY: optional(z.string().trim().min(1)),
  PAYMENT_NOTIFICATION_EMAIL: z.email().default('talhaomar1997@gmail.com'),
  PAYMENT_FROM_EMAIL: optional(z.email()),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
}).superRefine((values, context) => {
  const hasSupabaseUrl = Boolean(values.SUPABASE_URL);
  const hasSupabaseKey = Boolean(values.SUPABASE_SECRET_KEY || values.SUPABASE_SERVICE_ROLE_KEY);
  if (hasSupabaseUrl !== hasSupabaseKey) {
    context.addIssue({
      code: 'custom',
      message: 'SUPABASE_URL and a Supabase secret/service-role key must be configured together',
    });
  }

  if (values.RESEND_API_KEY && !values.PAYMENT_FROM_EMAIL) {
    context.addIssue({
      code: 'custom',
      message: 'PAYMENT_FROM_EMAIL is required when RESEND_API_KEY is configured',
    });
  }
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
  realm: values.NGENIUS_REALM,
  webhookHeader: values.NGENIUS_WEBHOOK_HEADER.toLowerCase(),
  webhookSecret: values.NGENIUS_WEBHOOK_SECRET,
  clientOrigins: values.CLIENT_URL.split(',').map((origin) => origin.trim().replace(/\/$/, '')),
  paymentRedirectOrigin: values.PAYMENT_REDIRECT_URL?.replace(/\/$/, ''),
  port: values.PORT,
  currency: values.PAYMENT_CURRENCY,
  bookingDepositMinor: Math.round(values.BOOKING_DEPOSIT_AED * 100),
  supabaseUrl: values.SUPABASE_URL?.replace(/\/$/, ''),
  supabaseServerKey: values.SUPABASE_SECRET_KEY ?? values.SUPABASE_SERVICE_ROLE_KEY,
  notificationEmail: values.PAYMENT_NOTIFICATION_EMAIL,
  paymentFromEmail: values.PAYMENT_FROM_EMAIL,
  resendApiKey: values.RESEND_API_KEY,
  nodeEnv: values.NODE_ENV,
  requestTimeoutMs: 15_000,
});
