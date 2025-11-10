// logic not all implemented

import * as ticketService from '../services/ticketService.js';

export async function create(req, res) {
  const { eventId } = req.params;
  const { tickets } = req.body;
  const created = await ticketService.createTicketsForEvent(
    parseInt(eventId),
    tickets,
  );

  res.status(201).json({
    message: `created ${created.length} tickets`,
    count: created.length,
  });
}

export async function getForEvent(req, res) {
  const { eventId } = req.params;
  const { status } = req.query;
  const tickets = await ticketService.getTicketsForEvent(
    parseInt(eventId),
    status,
  );
  res.status(200).json(tickets);
}

export async function getById(req, res) {
  const { id } = req.params;
  const ticket = await ticketService.getTicketById(parseInt(id));

  if (!ticket) {
    return res.status(404).json({ error: 'ticket not found' });
  }

  res.status(200).json(ticket);
}

export async function update(req, res) {
  const { id } = req.params;
  const data = {};

  if (req.body.price !== undefined) {
    data.price = req.body.price;
  }

  if (req.body.seatNumber !== undefined) {
    data.seatNumber = req.body.seatNumber;
  }

  const ticket = await ticketService.updateTicket(parseInt(id), data);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  res
    .status(200)
    .json({ message: 'ticket has been updated', ticketId: ticket.id });
}

export async function remove(req, res) {
  const { id } = req.params;
  await ticketService.deleteTicket(parseInt(id));
  res.status(200).json({ message: 'ticket has been deleted' });
}
