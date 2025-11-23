import * as ticketRepo from '../repositories/ticketRepo.js';
import { findAllTickets, getTicket, getAllTicketsByEvent } from '../repositories/ticketRepo.js';
import * as eventRepo from '../repositories/eventRepo.js';

export async function getAllTickets() {
  return await findAllTickets();
}

export async function getTicketById(id) {
  const ticket = await getTicket(id);
  if (ticket) return ticket;
  else {
    const error = new Error(`Cannot find ticket with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function getTicketsForEvent(eventId) {
  const event = await eventRepo.getEventById(eventId);
  if (!event) {
    const error = new Error(`Cannot find event with id ${eventId}`);
    error.status = 404;
    throw error;
  }

  let tickets = await getAllTicketsByEvent(eventId);
  return tickets;
}

export async function createTicketsForEvent(data) {
  const event = await eventRepo.getEventById(data.eventId);
  if (!event) {
    const error = new Error(`Cannot find event with id ${data.eventId}`);
    error.status = 404;
    throw error;
  }

  return await ticketRepo.createTicket(data);
}

export async function updateTicket(ticketId, data) {
  const existing = await ticketRepo.getTicket(ticketId);

  if (!existing) {
    const error = new Error(`Ticket with id ${ticketId} not found`);
    error.status = 404;
    throw error;
  }

  if(existing.ticketStatus === "AVAILABLE") return await ticketRepo.updateTicket(ticketId, data);
  else {
    const error = new Error(`Cannot update ticket with id ${ticketId} because it is sold`);
    error.status = 409;
    throw error;
  }


}

export async function deleteTicket(id) {
  const ticketToDelete = await getTicket(id);

  if (!ticketToDelete) {
    const error = new Error(`Ticket with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  if(ticketToDelete.ticketStatus === "AVAILABLE") return await ticketRepo.deleteTicket(id);
  else {
    const error = new Error(`Cannot delete ticket with id ${id} because it is sold`);
    error.status = 409;
    throw error;
  }
}

export default {
  createTicketsForEvent,
  getTicketsForEvent,
  getTicketById,
  updateTicket,
  deleteTicket,
};
