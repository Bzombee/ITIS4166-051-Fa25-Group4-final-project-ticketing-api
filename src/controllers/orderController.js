import * as orderService from '../services/orderService.js';

export async function createOrderHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { ticketIds } = req.body;

    const order = await orderService.createOrder(userId, ticketIds);
    res.status(201).json({
      message: `Order created with id of ${order.id}`,
      orderId: order.id,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrdersHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const orders = await orderService.getOrdersForUser(parseInt(userId));
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getMyOrderByIdHandler(req, res, next) {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.user.id; 

    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You do not own this order' });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
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