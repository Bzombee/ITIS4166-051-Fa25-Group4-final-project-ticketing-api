import prisma from '../config/prismaClient.js';

export async function getOrderById(orderId) {
  return await prisma.order.findUnique({
    where: { id: orderId },
  });
}

export async function createOrder(orderData) {
  return await prisma.order.create({
    data: orderData,
  });
}

export async function updateOrder(orderId, updateData) {
  return await prisma.order.update({
    where: { id: orderId },
    data: updateData,
  });
}

export async function deleteOrder(orderId) {
  return await prisma.order.delete({
    where: { id: orderId },
  });
}
