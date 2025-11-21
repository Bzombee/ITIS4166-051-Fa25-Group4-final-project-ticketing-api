import * as eventService from '../services/eventService.js';

export async function createEventHandler(req, res, next) {
  try {
    const {
      title,
      date,
      location,
      description,
      eventType,
      ticketsAvailable,
    } = req.body;

    // Validate required fields
    if (!title || !location || ticketsAvailable === undefined) {
      const error = new Error('Missing required fields: title, location, and ticketsAvailable are required');
      error.status = 400;
      throw error;
    }

    // Use authenticated user's ID as the organizer
    // Only admins can create events for other organizers
    let organizerId = req.user.id;
    
    if (req.body.organizerId && req.user.role === 'ADMIN') {
      organizerId = parseInt(req.body.organizerId);
    }

    // Parse and validate date
    let eventDate = new Date();
    if (date) {
      eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) {
        const error = new Error('Invalid date format. Please use ISO 8601 format (e.g., 2025-12-01 or 2025-12-01T18:00:00Z)');
        error.status = 400;
        throw error;
      }
    }

    const event = await eventService.createEvent({
      title,
      date: eventDate,
      location,
      description: description || '',
      eventType: eventType || 'OTHER',
      ticketsAvailable: parseInt(ticketsAvailable),
      organizerId,
    });

    res.status(201).json({
      message: `event created with id of ${event.id}`,
      eventId: event.id,
    });
  } catch (error) {
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
    
    // Validate that at least one field is being updated
    const allowedFields = ['title', 'location', 'description', 'eventType', 'ticketsAvailable', 'date'];
    const hasUpdates = allowedFields.some(field => req.body[field] !== undefined);
    
    if (!hasUpdates) {
      const error = new Error('At least one field must be provided for update');
      error.status = 400;
      throw error;
    }

    // Build update data object
    ['title', 'location', 'description', 'eventType', 'ticketsAvailable'].forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Parse and validate date if provided
    if (req.body.date !== undefined) {
      const eventDate = new Date(req.body.date);
      if (isNaN(eventDate.getTime())) {
        const error = new Error('Invalid date format. Please use ISO 8601 format (e.g., 2025-12-01 or 2025-12-01T18:00:00Z)');
        error.status = 400;
        throw error;
      }
      updateData.date = eventDate;
    }

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
