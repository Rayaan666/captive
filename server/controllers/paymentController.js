import {
  createPaymentOrder,
  getPublicPaymentConfig,
  processPaymentWebhook,
  verifyPaymentOrder,
} from '../services/paymentService.js';
import { env } from '../config/env.js';
import { assertWebhookAuthorized } from '../services/webhookSecurity.js';

export const getPaymentConfig = async (req, res) => {
  res.json(getPublicPaymentConfig());
};

export const createOrder = async (req, res) => {
  res.status(201).json(await createPaymentOrder(req.body));
};

export const getPaymentStatus = async (req, res) => {
  res.json(await verifyPaymentOrder(req.params.orderReference));
};

export const receivePaymentWebhook = async (req, res) => {
  assertWebhookAuthorized(req.get(env.webhookHeader));
  res.json(await processPaymentWebhook(req.body));
};
