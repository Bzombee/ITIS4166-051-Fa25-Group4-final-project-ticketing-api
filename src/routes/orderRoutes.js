import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validateOrder } from '../middleware/orderValidators.js';
import {
  createOrderHandler,
  getMyOrderByIdHandler,
  getMyOrdersHandler,
  cancelOrderHandler,
} from '../controllers/orderController.js';

const router = express.Router();

router.use(authenticate);
router.post('/', validateOrder, createOrderHandler);
router.get('/me', getMyOrdersHandler);
router.get('/me/:id', getMyOrderByIdHandler);
router.patch('/:id/status', cancelOrderHandler);

export default router;
