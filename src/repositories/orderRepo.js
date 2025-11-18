import prisma from '../config/db.js';

export async function createOrderTransaction(userId, ticketIds, total) {
  // Creates an order and marks tickets as sold in a transaction
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        total,
        orderStatus: 'COMPLETED',
        orderTickets: {
          create: ticketIds.map((ticketId) => ({ ticketId })),
        },
      },
      include: { orderTickets: true },
    });

    await tx.ticket.updateMany({
      where: { id: { in: ticketIds } },
      data: { ticketStatus: 'SOLD' },
    });

    return order;
  });
}

export async function getById(id) {
  return await prisma.order.findUnique({
    where: { id },
    include: { orderTickets: { include: { ticket: true } } },
  });
}

export async function getOrders(userId) {
  return await prisma.order.findMany({
    where: { userId },
    include: { orderTickets: { include: { ticket: true } } },
    orderBy: { orderDate: 'desc' },
  });
}

export async function cancelOrderTransaction(id) {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id },
      include: { orderTickets: true },
    });
    if (!order) throw new Error('Order not found');

    if (order.orderStatus === 'CANCELLED') {
      throw new Error('Order already cancelled');
    }

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
}

export async function remove(id) {
try {
    const deletedOrder = await prisma.order.delete({
      where: { id: id },
    });
    return deletedOrder;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export default {
  cancelOrderTransaction,
};
