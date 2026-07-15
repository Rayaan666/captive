import { env } from '../../server/config/env.js';
import {
  createPaymentOrder,
  getPublicPaymentConfig,
  processPaymentWebhook,
  verifyPaymentOrder,
} from '../../server/services/paymentService.js';
import { assertWebhookAuthorized } from '../../server/services/webhookSecurity.js';
import { ApiError } from '../../server/utils/ApiError.js';

const responseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: responseHeaders,
});

const readJson = async (request) => {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 32_768) throw new ApiError(413, 'Request body is too large.');

  try {
    return await request.json();
  } catch {
    throw new ApiError(400, 'Request body must be valid JSON.');
  }
};

export default async (request, context) => {
  try {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/api/payments/config') {
      return json(getPublicPaymentConfig());
    }

    if (request.method === 'POST' && url.pathname === '/api/payments/create-order') {
      return json(await createPaymentOrder(await readJson(request)), 201);
    }

    if (request.method === 'GET' && context.params.orderReference) {
      return json(await verifyPaymentOrder(context.params.orderReference));
    }

    if (request.method === 'POST' && url.pathname === '/api/payments/webhook') {
      assertWebhookAuthorized(request.headers.get(env.webhookHeader));
      return json(await processPaymentWebhook(await readJson(request)));
    }

    return json({ message: 'Payment API endpoint not found.' }, 404);
  } catch (error) {
    const isKnownError = error instanceof ApiError;
    if (!isKnownError) console.error('Unhandled payment function error', error);

    return json({
      message: isKnownError ? error.message : 'An unexpected payment service error occurred.',
      ...(isKnownError && error.details ? { errors: error.details } : {}),
    }, isKnownError ? error.statusCode : 500);
  }
};

export const config = {
  path: [
    '/api/payments/config',
    '/api/payments/create-order',
    '/api/payments/status/:orderReference',
    '/api/payments/webhook',
  ],
};
