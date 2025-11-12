import prisma from '../config/prismaClient.js';

/**
 * Create order: checks ticket availability, creates order and orderTickets,
 * and marks tickets as SOLD inside a transaction.
 */
export async function createOrder(userId, ticketIds) {
  const ids = ticketIds.map((id) => parseInt(id, 10));

  if (ids.length === 0) {
    throw new Error('no tickets provided');
  }

  const tickets = await prisma.ticket.findMany({ where: { id: { in: ids } } });

  if (tickets.length !== ids.length) {
    throw new Error('tickets not found');
  }

  if (tickets.some((t) => t.ticketStatus !== 'AVAILABLE')) {
    throw new Error('tickets are not available');
  }

  //   get total price
  let total = 0;
  for (const ticket of tickets) {
    total += ticket.price;
  }

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      orderStatus: 'COMPLETED',
      orderTickets: {
        create: ids.map((ticketId) => ({ ticketId })),
      },
    },
    include: { orderTickets: true },
  });

  await prisma.ticket.updateMany({
    where: { id: { in: ids } },
    data: { ticketStatus: 'SOLD' },
  });

  return order;
}

export async function getOrderById(id) {
  return await prisma.order.findUnique({
    where: { id },
    include: { orderTickets: { include: { ticket: true } }, user: true },
  });
}

export async function getOrdersForUser(userId) {
  return await prisma.order.findMany({
    where: { userId },
    include: { orderTickets: { include: { ticket: true } } },
    orderBy: { orderDate: 'desc' },
  });
}

export async function cancelOrder(id, requestingUser) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderTickets: true },
  });
  if (!order) throw new Error('Order not found');

  if (order.orderStatus === 'CANCELLED')
    throw new Error('Order already cancelled');

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.order.update({
      where: { id },
      data: { orderStatus: 'CANCELLED' },
    });
    await tx.ticket.updateMany({
      where: { id: { in: order.orderTickets.map((ot) => ot.ticketId) } },
      data: { ticketStatus: 'AVAILABLE' },
    });
    return updated;
  });

  return result;
}

export default { createOrder, getOrderById, getOrdersForUser, cancelOrder };
