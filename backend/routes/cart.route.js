import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import authMiddleware from '../middleware/auth.js';


const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.get("/get", authMiddleware, getCart);

export default router;