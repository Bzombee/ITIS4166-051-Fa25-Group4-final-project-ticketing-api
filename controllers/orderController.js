import * as orderService from '../services/orderService.js';

export async function createOrderHandler(req, res, next) {
  try {
    const { userId, ticketIds } = req.body;
    const order = await orderService.createOrder(userId, ticketIds);
    res.status(201).json({
      message: `Order created with id of ${order.id}`,
      orderId: order.id,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrderByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(parseInt(id));

    if (!order) {
      return res.status(404).json({ error: 'prder not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export async function getOrderForUserHandler(req, res, next) {
  try {
    const { userId } = req.params;
    const orders = await orderService.getOrdersForUser(parseInt(userId));

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function cancelOrderHandler(req, res, next) {
  try {
    const { id } = req.params;
    const order = await orderService.cancelOrder(parseInt(id));

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order cancelled', orderId: order.id });
  } catch (error) {
    next(error);
  }
}
