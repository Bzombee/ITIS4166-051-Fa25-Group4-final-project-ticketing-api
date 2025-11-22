import prisma from '../config/db.js';

export async function findAllTickets() {
  return await prisma.ticket.findMany();
}

export async function getAllTicketsByEvent(eventId) {
  return await prisma.ticket.findMany({
    where: {eventId},
  });
}

export async function getTicket(ticketId) {
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
  });
}

export async function createTicket(ticketData) {
  return await prisma.ticket.create({
    data: ticketData,
  });
}

export async function updateTicket(ticketId, updateData) {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: updateData,
  });
}

export async function deleteTicket(ticketId) {
  return await prisma.ticket.delete({
    where: { id: ticketId },
  });
}
