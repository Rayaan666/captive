import { z } from 'zod';

const requiredText = (label, maximum = 200) => z.string()
  .trim()
  .min(1, `${label} is required`)
  .max(maximum, `${label} is too long`);

export const bookingPaymentSchema = z.object({
  fullName: requiredText('Full name', 120),
  email: z.email('Enter a valid email address').max(254),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,25}$/, 'Enter a valid phone number'),
  companyName: z.string().trim().max(160, 'Company name is too long').default(''),
  eventType: requiredText('Event type', 100),
  eventDate: z.iso.date('Enter a valid event date'),
  eventLocation: requiredText('Event location', 200),
  guestCount: z.coerce.number().int('Guest count must be a whole number').min(1).max(1_000_000),
  message: requiredText('Message', 3_000),
  totalAmount: z.union([z.string(), z.number()])
    .transform((value) => String(value).trim())
    .refine((value) => /^\d{1,7}(\.\d{1,2})?$/.test(value), 'Enter a valid amount with up to two decimals')
    .refine((value) => Number(value) >= 1, 'The minimum payment amount is 1.00'),
}).strict();

export const orderReferenceSchema = z.string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[A-Za-z0-9-]+$/, 'Invalid order reference');

export const amountToMinorUnits = (amount) => Math.round(Number(amount) * 100);
