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

export async function createTicketsForEvent(data) {
  const event = await eventRepo.getEventById(data.eventId);
  if (!event) {
    const error = new Error(`Cannot find event with id ${data.eventId}`);
    error.status = 404;
    throw error;
  }

  return await ticketRepo.createTicket(data);
}

export async function updateTicket(id, data) {
  const ticket = await ticketRepo.updateTicket(id, data);
  if(ticket) return ticket;
  else {
    const error = new Error(`Cannot find ticket with id ${id}`);
    error.status = 404;
    throw error;
  }
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
