import express from 'express';
import {
  validateEvent,
  validateEventUpdate,
} from '../middleware/eventValidators.js';
import { createEventHandler, getAllEventHandler, getEventByIdHandler, updateEventHandler, deleteEventHandler } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEventHandler);
router.get('/:id', getEventByIdHandler);
router.post('/', validateEvent, createEventHandler);
router.put('/:id', validateEventUpdate, updateEventHandler);
router.delete('/:id', deleteEventHandler);

export default router;
