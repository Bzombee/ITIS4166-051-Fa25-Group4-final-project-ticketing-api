import * as eventRepo from '../repositories/eventRepo.js';

export async function getAllEvents(filters = {}) {
  return await eventRepo.getAllEvents();
}

export async function getEventById(id) {
  return await eventRepo.getEventById(id);
}

export async function createEvent(data) {
  return await eventRepo.createEvent(data);
}

export async function updateEvent(id, updateData) {
  return await eventRepo.updateEvent(id, updateData);
}

export async function deleteEvent(id) {
  return await eventRepo.deleteEvent(id);
}

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
