import { getOrderById } from '../services/orderService.js';
import { getEventById } from '../services/eventService.js';

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

export async function authorizeEventOwnership(req, res, next) {
  try {
    const eventId = parseInt(req.params.id || req.params.eventId);
    const event = await getEventById(eventId);

    // Admins can modify any event
    if (req.user.role === 'ADMIN') {
      return next();
    }

    // Organizers can only modify their own events
    if (req.user.role === 'ORGANIZER' && event.organizerId === req.user.id) {
      return next();
    }

    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    return next(error);
  } catch (error) {
    return next(error);
  }
}

export async function authorizeOwnershipTemplate(req, res, next) {
}