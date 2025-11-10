import * as ticketRepo from '../repositories/ticketRepo.js';
import * as eventRepo from '../repositories/eventRepo.js';

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

export async function getTicketsForEvent(eventId, status) {
  let tickets = await ticketRepo.getAllTickets();
  tickets = tickets.filter((t) => {
    if (t.eventId !== eventId) {
      return false;
    }
    if (status && t.ticketStatus !== status) {
      return false;
    }

    return true;
  });
  return tickets;
}

export async function getTicketById(id) {
  return await ticketRepo.getTicketById(id);
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
