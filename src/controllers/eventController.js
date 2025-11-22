import * as eventService from '../services/eventService.js';

export async function createEventHandler(req, res, next) {
  try {
    const {
      title,
      date,
      location,
      description = '',
      eventType = 'OTHER',
      ticketsAvailable,
      organizerId: providedOrganizerId,
    } = req.body;

    // Organizer logic (admins may override)
    const organizerId =
      req.user.role === 'ADMIN' && providedOrganizerId
        ? parseInt(providedOrganizerId)
        : req.user.id;

    // Convert date string → Date object (validation occurs in middleware)
    const eventDate = new Date(date);

    const event = await eventService.createEvent({
      title,
      date: eventDate,
      location,
      description,
      eventType,
      ticketsAvailable: parseInt(ticketsAvailable),
      organizerId,
    });

    return res.status(201).json({
      message: `Event created with id ${event.id}`,
      eventId: event.id,
    });
  } catch (error) {
    if (error.code === 'P2002') {
    return res.status(400).json({
      error: "An event with this title already exists."
    });
  }
  next(error);
}
}

export async function getAllEventHandler(req, res, next) {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

export async function getEventsByOrganizerHandler(req, res, next) {
  try {
    const { id } = req.params;
    const events = await eventService.getEventsByOrganizer(id);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

export async function getEventByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(parseInt(id));
    if (!event) {
      return res.status(404).json({ error: 'event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
}

export async function updateEventHandler(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = {};
    
    // Build update data object
    ['title', 'location', 'description', 'eventType', 'ticketsAvailable'].forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const event = await eventService.updateEvent(parseInt(id), updateData);

    if (!event) {
      return res.status(404).json({ error: 'event not found' });
    }

    // Return the full event object
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
}

export async function deleteEventHandler(req, res, next) {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(parseInt(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
