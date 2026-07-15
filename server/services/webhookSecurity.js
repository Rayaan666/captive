import { timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const assertWebhookAuthorized = (providedSecret) => {
  if (!env.webhookSecret) {
    throw new ApiError(503, 'The payment webhook is not configured.');
  }

  const expected = Buffer.from(env.webhookSecret);
  const provided = Buffer.from(providedSecret ?? '');
  const matches = expected.length === provided.length && timingSafeEqual(expected, provided);

  if (!matches) throw new ApiError(401, 'Invalid payment webhook credentials.');
};
