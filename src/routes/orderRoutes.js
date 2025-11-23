import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validateOrder } from '../middleware/orderValidators.js';
import {
  createOrderHandler,
  getOrderByIdHandler,
  getOrdersHandler,
  cancelOrderHandler,
  deleteOrderHandler
} from '../controllers/orderController.js';
import { authroizeRoles } from '../middleware/authorizeRoles.js';
import { authorizeOrderOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

// Implement delete
router.post('/', authenticate, validateOrder, createOrderHandler);
router.get('/me', authenticate, getOrdersHandler);
router.get('/me/:id', authenticate, authorizeOrderOwnership, getOrderByIdHandler);
router.patch('/:id/status', authenticate, authorizeOrderOwnership, cancelOrderHandler);
router.delete('/:id', authenticate, authroizeRoles('ADMIN'), deleteOrderHandler)

export default router;
