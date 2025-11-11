import express from 'express';
import {
  validateTicket,
  validateTicketUpdate,
} from '../middleware/ticketValidators.js';
import { createTicketHandler, getForEventHandler, getTicketByIdHandler, updateTicketHandler, deleteTicketHandler } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/:eventId/tickets', validateTicket, createTicketHandler);
router.get('/:eventId/tickets', getForEventHandler);
router.get('/:id', getTicketByIdHandler);
router.put('/:id', validateTicketUpdate, updateTicketHandler);
router.delete('/:id', deleteTicketHandler);

export default router;
