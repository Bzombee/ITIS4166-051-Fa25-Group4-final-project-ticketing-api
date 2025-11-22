import * as eventRepo from '../repositories/eventRepo.js';

export async function getAllEvents(filters = {}) {
  return await eventRepo.getAllEvents(filters);
}

export async function getEventById(id) {
  const result = await eventRepo.getEventById(id);
  if (result) return result;
  const error = new Error(`Cannot find event with id ${id}`);
  error.status = 404;
  throw error;
}

export async function createEvent(data) {
  return await eventRepo.createEvent(data);
}

export async function getEventsByOrganizer(id) {
  const organizerId = parseInt(id, 10);
  if (Number.isNaN(organizerId)) {
    const error = new Error('Invalid organizer id');
    error.status = 400;
    throw error;
  }

  const events = await eventRepo.getEventsByOrganizer(organizerId);
  if (!events || events.length === 0) {
    const error = new Error(`Cannot find organizer with id ${organizerId}`);
    error.status = 404;
    throw error;
  }

  return events;
}

export async function updateEvent(id, updateData) {
  try {
    const updated = await eventRepo.updateEvent(id, updateData);
    return updated;
  } catch (error) {
    if (error && error.code === 'P2025') {
      const e = new Error(`Cannot find event with id ${id}`);
      e.status = 404;
      throw e;
    }
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    await eventRepo.deleteEvent(id);
    return;
  } catch (error) {
    if (error && error.code === 'P2025') {
      const e = new Error(`Cannot find event with id ${id}`);
      e.status = 404;
      throw e;
    }
    throw error;
  }
}

export default {
  getAllEvents,
  getEventById,
  createEvent,
  getEventsByOrganizer,
  updateEvent,
  deleteEvent,
};
