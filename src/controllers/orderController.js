import {getOrdersForUser, getOrderById, createOrder, cancelOrder, deleteOrder} from '../services/orderService.js';

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

    const orderToCancel = await cancelOrder(orderId);
    res.status(200).json(orderToCancel);
  } catch (error) {
    next(error);
  }
}

export async function deleteOrderHandler(req, res, next) {
  const id = parseInt(req.params.id, 10);
  await deleteOrder(id);
  res.status(204).send();
}