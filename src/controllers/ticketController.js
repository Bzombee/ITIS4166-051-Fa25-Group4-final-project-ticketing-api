import { getAllTickets, getTicketsForEvent, getTicketById, createTicketsForEvent, updateTicket, deleteTicket } from '../services/ticketService.js';

export async function getAllTicketsHandler(req, res) {
  const tickets = await getAllTickets();
  res.status(200).json(tickets);
}

export async function getTicketByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  const ticket = await getTicketById(parseInt(id));
  res.status(200).json(ticket);
}

export async function getForEventHandler(req, res) {
  const { eventId } = req.params;
  const tickets = await getTicketsForEvent(parseInt(eventId));
  res.status(200).json(tickets);
}

export async function createTicketHandler(req, res) {
  const eventId = parseInt(req.params.eventId);
  const data = {    
    price: parseFloat(req.body.price),
    seatNumber: req.body.seatNumber,
    eventId: eventId,
   };
  const newTicket = await createTicketsForEvent(data);

  res.status(201).json(newTicket);
}

export async function updateTicketHandler(req, res) {
  const { id } = req.params;
  const data = {
    price: parseFloat(req.body.price),
    seatNumber: req.body.seatNumber
  };

  const ticket = await updateTicket(parseInt(id), data);

  res.status(200).json(ticket);
}

export async function deleteTicketHandler(req, res) {
  const { id } = req.params;
  await deleteTicket(parseInt(id));
  res.status(200).json({ message: 'ticket has been deleted' });
}
