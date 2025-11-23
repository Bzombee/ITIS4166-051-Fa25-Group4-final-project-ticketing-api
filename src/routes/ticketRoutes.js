import express from 'express';
import {
  validateTicket,
  validateTicketUpdate,
} from '../middleware/ticketValidators.js';
import { authenticate } from '../middleware/authenticate.js';
import { authroizeRoles } from '../middleware/authorizeRoles.js';
import { authorizeEventOwnership } from '../middleware/authorizeOwnership.js';
import { getAllTicketsHandler, createTicketHandler, getForEventHandler, getTicketByIdHandler, updateTicketHandler, deleteTicketHandler } from '../controllers/ticketController.js';

const router = express.Router();

router.get('/', getAllTicketsHandler);
router.get('/:id', getTicketByIdHandler);
router.get('/:eventId/tickets', getForEventHandler);
router.post('/:eventId/tickets', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), authorizeEventOwnership, validateTicket, createTicketHandler);
router.put('/:id', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), validateTicketUpdate, updateTicketHandler);
//router.delete('/:id', authenticate, authroizeRoles('ADMIN', 'ORGANIZER'), deleteTicketHandler); //delete ticket checker, see if ticket not sold

export default router;
