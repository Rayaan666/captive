import { Router } from 'express';
import { createOrder, getPaymentStatus } from '../controllers/paymentController.js';

const router = Router();

router.post('/create-order', createOrder);
router.get('/status/:orderReference', getPaymentStatus);

export default router;
