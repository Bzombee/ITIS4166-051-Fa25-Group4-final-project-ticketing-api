import * as orderService from '../services/orderService.js';
import {getOrdersForUser, getOrderById, createOrder} from '../services/orderService.js';

export async function createOrderHandler(req, res, next) {
  try {
    const data = {
      userId: req.user.id,
      ticketIds: req.body.ticketIds
    }

    const newOrder = await createOrder(data);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
}

export async function getOrdersHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const orders = await getOrdersForUser(parseInt(userId));
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrderByIdHandler(req, res, next) {
  let id = parseInt(req.params.id);
  let order = await getOrderById(id);
  res.status(200).json(order);
}

export async function cancelOrderHandler(req, res, next) {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.user.id; 

    const orderToCancel = await orderService.getOrderById(orderId);

    if (!orderToCancel) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (orderToCancel.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You do not own this order' });
    }

    const order = await orderService.cancelOrder(orderId);
    res.status(200).json({ message: 'Order cancelled', orderId: order.id });
  } catch (error) {
    next(error);
  }
}

export async function deleteOrderHandler(req, res, next) {
  let id = parseInt(req.order.id);
  await deleteOrder(id);
  res.status(204).send();
}