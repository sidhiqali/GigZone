import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {
  createOrder,
  getOrders,
  confirmOrder,
} from '../controllers/orderController.js';
const router = express.Router();

router.post('/create-payment-intent/:gigId', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
router.put('/', verifyToken, confirmOrder);

export default router;
