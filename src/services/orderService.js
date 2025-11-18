import {getOrders, getById, createOrderTransaction, cancelOrderTransaction, remove} from '../repositories/orderRepo.js'
import prisma from '../config/db.js';

export async function createOrder({ userId, ticketIds }) {
  
  const ids = ticketIds.map((id) => parseInt(id, 10));

  const tickets = await prisma.ticket.findMany({
    where: { id: { in: ids } }
  });

  if (tickets.length !== ids.length) {
    const error = new Error(`Some tickets could not be found`);
    error.status = 404;
    throw error;
  }

  const unavailable = tickets.filter((t) => t.ticketStatus !== 'AVAILABLE');
  if (unavailable.length > 0) {
    const error = new Error(`Some tickets are not available`);
    error.status = 409;
    throw error;
  }

  const total = tickets.reduce((sum, t) => sum + t.price, 0);

  return await createOrderTransaction(userId, ids, total);

}

export async function getOrderById(id) {

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

export async function cancelOrder(id, updates) {
  const cancelledOrder = await cancelOrderTransaction(id, updates);
      if (cancelledOrder) return cancelledOrder;
    else {
        const error = new Error(`Cannot find order with id ${id}`);
        error.status = 404;
        throw error;
    }
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
