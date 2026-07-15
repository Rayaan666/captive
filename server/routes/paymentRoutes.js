import { Router } from 'express';
import {
  createOrder,
  getPaymentConfig,
  getPaymentStatus,
  receivePaymentWebhook,
} from '../controllers/paymentController.js';

const router = Router();

router.get('/config', getPaymentConfig);
router.post('/create-order', createOrder);
router.get('/status/:orderReference', getPaymentStatus);
router.post('/webhook', receivePaymentWebhook);

export default router;
