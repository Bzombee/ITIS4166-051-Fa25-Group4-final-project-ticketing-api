import express from 'express';
import {
  validateEvent,
  validateEventUpdate,
} from '../middleware/eventValidators.js';
import * as controller from '../controllers/eventController.js';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateEvent, controller.create);
router.put('/:id', validateEventUpdate, controller.update);

router.delete('/:id', controller.remove);

export default router;
