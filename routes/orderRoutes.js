import express from 'express';
import { validateOrder } from '../middleware/orderValidators.js';
import { createOrderHandler, getOrderByIdHandler, getOrderForUserHandler, cancelOrderHandler } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', validateOrder, createOrderHandler);
router.get('/:id', getOrderByIdHandler);
router.get('/user/:userId', getOrderForUserHandler);
router.put('/:id/cancel', cancelOrderHandler);

export default router;
