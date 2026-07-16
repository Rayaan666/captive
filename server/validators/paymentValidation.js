import { z } from 'zod';

const requiredText = (label, maximum = 200) => z.string()
  .trim()
  .min(1, `${label} is required`)
  .max(maximum, `${label} is too long`);

const optionalText = (label, maximum = 200) => z.string()
  .trim()
  .max(maximum, `${label} is too long`)
  .default('');

export const bookingPaymentSchema = z.object({
  fullName: requiredText('Customer name', 120)
    .min(2, 'Customer name must contain at least 2 characters')
    .regex(/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u, 'Enter a valid customer name'),
  email: z.string()
    .trim()
    .toLowerCase()
    .pipe(z.email('Enter a valid email address').max(254))
    .refine((value) => /\.[A-Za-z]{2,63}$/.test(value), 'Email must include a valid domain'),
  phone: z.string()
    .trim()
    .regex(/^\+[1-9][0-9]{7,14}$/, 'Use international format, for example +971501234567'),
  poNumber: requiredText('PO number', 60)
    .regex(/^[A-Za-z0-9][A-Za-z0-9./_-]*$/, 'PO number may contain letters, numbers, dots, slashes, underscores and hyphens'),
  companyName: optionalText('Company name', 160),
  eventType: optionalText('Event type', 100),
  eventDate: z.union([z.literal(''), z.iso.date('Enter a valid event date')]).default(''),
  eventLocation: optionalText('Event location', 200),
  guestCount: z.union([
    z.literal(''),
    z.coerce.number().int('Guest count must be a whole number').min(1).max(1_000_000),
  ]).default(''),
  message: optionalText('Message', 3_000),
  totalAmount: z.union([z.string(), z.number()])
    .transform((value) => String(value).trim())
    .refine((value) => /^\d{1,7}(\.\d{1,2})?$/.test(value), 'Enter a valid amount with up to two decimals')
    .refine((value) => Number(value) >= 1, 'The minimum payment amount is AED 1.00'),
}).strict();

export const orderReferenceSchema = z.string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[A-Za-z0-9-]+$/, 'Invalid order reference');

export const amountToMinorUnits = (amount) => Math.round(Number(amount) * 100);
