import express from 'express';
import {
  validateTicket,
  validateTicketUpdate,
} from '../middleware/ticketValidators.js';
import { createTicketHandler, getForEventHandler, getTicketByIdHandler, updateTicketHandler, deleteTicketHandler } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/:eventId/tickets', validateTicket, createTicketHandler);
//router.get('/'); // implement get all tickets
//router.get('/me') //implement tickets for logged in user
router.get('/:eventId/tickets', getForEventHandler);
router.get('/:id', getTicketByIdHandler);
router.put('/:id', validateTicketUpdate, updateTicketHandler);
//router.patch(':id/status'); //implement changing ticket status
router.delete('/:id', deleteTicketHandler);

export default router;
