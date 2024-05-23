import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post("/place", authMiddleware, placeOrder)

export default router;