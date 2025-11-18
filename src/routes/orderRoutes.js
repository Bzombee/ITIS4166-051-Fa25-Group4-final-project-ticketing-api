import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validateOrder } from '../middleware/orderValidators.js';
import {
  createOrderHandler,
  getMyOrderByIdHandler,
  getMyOrdersHandler,
  cancelOrderHandler,
} from '../controllers/orderController.js';
import { authroizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Implement delete
router.post('/', authenticate, validateOrder, createOrderHandler);
router.get('/me', authenticate, getMyOrdersHandler);
router.get('/me/:id', authenticate, getMyOrderByIdHandler);
router.patch('/:id/status', authenticate, cancelOrderHandler);
router.delete('/:id', authenticate, authroizeRoles('ADMIN'))

export default router;
