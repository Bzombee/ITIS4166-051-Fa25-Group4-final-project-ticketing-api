import express from 'express';
import {
  validateTicket,
  validateTicketUpdate,
} from '../middleware/ticketValidators.js';
import * as controller from '../controllers/ticketController.js';

const router = express.Router();

router.post('/:eventId/tickets', validateTicket, controller.create);

router.get('/:eventId/tickets', controller.getForEvent);
router.get('/:id', controller.getById);

router.put('/:id', validateTicketUpdate, controller.update);
router.delete('/:id', controller.remove);

export default router;
