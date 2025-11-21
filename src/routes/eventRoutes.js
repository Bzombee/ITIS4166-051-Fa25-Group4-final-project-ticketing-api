import express from 'express';
import {
  validateEvent,
  validateEventUpdate,
} from '../middleware/eventValidators.js';
import {
  createEventHandler,
  getAllEventHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
  getEventsByOrganizerHandler,
} from '../controllers/eventController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authroizeRoles } from '../middleware/authorizeRoles.js';
import { authorizeEventOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', getAllEventHandler);
router.get('/organizer/:id', getEventsByOrganizerHandler);
router.get('/:id', getEventByIdHandler);
router.post('/', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), validateEvent, createEventHandler);
router.put('/:id', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), authorizeEventOwnership, validateEventUpdate, updateEventHandler);
router.delete('/:id', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), authorizeEventOwnership, deleteEventHandler);

export default router;
