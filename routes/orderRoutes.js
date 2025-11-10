import express from 'express';
import { validateOrder } from '../middleware/orderValidators.js';
import * as controller from '../controllers/orderController.js';

const router = express.Router();

router.post('/', validateOrder, controller.create);

router.get('/:id', controller.getById);
router.get('/user/:userId', controller.getForUser);
router.put('/:id/cancel', controller.cancel);

export default router;
