import express from 'express';
import {
  validateTicket,
  validateTicketUpdate,
} from '../middleware/ticketValidators.js';
import { authenticate } from '../middleware/authenticate.js';
import { authroizeRoles } from '../middleware/authorizeRoles.js';
import { createTicketHandler, getForEventHandler, getTicketByIdHandler, updateTicketHandler, deleteTicketHandler } from '../controllers/ticketController.js';

const router = express.Router();

//router.get('/'); // implement get all tickets
router.get('/:id', getTicketByIdHandler);
//router.get('/me', authenticate) //implement tickets for logged in user
router.get('/:eventId/tickets', getForEventHandler);
router.post('/:eventId/tickets', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), validateTicket, createTicketHandler);
router.put('/:id', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), validateTicketUpdate, updateTicketHandler);
//router.patch(':id/status', authenticate, authroizeRoles('ADMIN', 'ORGANIZER')); //implement changing ticket status
router.delete('/:id', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), deleteTicketHandler); //delete ticket checker, see if ticket not sold

export default router;
