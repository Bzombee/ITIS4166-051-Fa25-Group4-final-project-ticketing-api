import { getOrderById } from '../services/orderService.js';

export async function authorizeOrderOwnership(req, res, next) {
  const orderId = parseInt(req.params.id);
  const order = await getOrderById(orderId);

  if (order.userId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    return next(error);
  }
  return next();
}


export async function authorizeOwnershipTemplate(req, res, next) {
}