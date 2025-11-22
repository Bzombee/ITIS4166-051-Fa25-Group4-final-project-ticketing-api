import * as ticketRepo from '../repositories/ticketRepo.js';
import * as eventRepo from '../repositories/eventRepo.js';

export async function getAllTickets() {
  return await ticketRepo.findAllTickets();
}

export async function getTicketById(id) {
  const ticket = await ticketRepo.getTicket(id);
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

  let tickets = await ticketRepo.getAllTicketsByEvent(eventId);
  return tickets;
}

export async function createTicketsForEvent(eventId, ticketsArray) {
  // if event exists, otherwise throw error
  const event = await eventRepo.getEventById(eventId);
  if (!event) {
    throw new Error('Event not found');
  }

  const created = [];
  for (const t of ticketsArray) {
    const ticket = await ticketRepo.createTicket({ ...t, eventId });
    created.push(ticket);
  }
  return created;
}

export async function updateTicket(id, data) {
  return await ticketRepo.updateTicket(id, data);
}

export async function deleteTicket(id) {
  return await ticketRepo.deleteTicket(id);
}

export default {
  createTicketsForEvent,
  getTicketsForEvent,
  getTicketById,
  updateTicket,
  deleteTicket,
};
