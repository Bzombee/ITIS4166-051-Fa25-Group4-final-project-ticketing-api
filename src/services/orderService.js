import * as orderRepo from '../repositories/orderRepo.js';
import {getOrders, getById} from '../repositories/orderRepo.js'
import prisma from '../config/db.js';

export async function createOrder(userId, ticketIds) {
  const ids = ticketIds.map((id) => parseInt(id, 10));
  if (ids.length === 0) throw new Error('No tickets provided');

  const tickets = await prisma.ticket.findMany({ where: { id: { in: ids } } });
  if (tickets.length !== ids.length) throw new Error('Some tickets not found');

  const unavailable = tickets.filter((t) => t.ticketStatus !== 'AVAILABLE');
  if (unavailable.length > 0) throw new Error('Some tickets are not available');

  const total = tickets.reduce((sum, t) => sum + t.price, 0);

  return await orderRepo.createOrderTransaction(userId, ids, total);
}

export async function getOrderById(id) {
  // return await getOrderById(id);

  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find order with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function getOrdersForUser(userId) {
  return await getOrders(userId);
}

export async function cancelOrder(id) {
  return await orderRepo.cancelOrderTransaction(id);
}

export async function deleteOrder(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find order with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export default { createOrder, getOrderById, getOrdersForUser, cancelOrder };
