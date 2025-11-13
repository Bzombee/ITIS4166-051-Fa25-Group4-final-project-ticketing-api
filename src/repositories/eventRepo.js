import prisma from '../config/db.js';

export async function getAllEvents() {
  return await prisma.event.findMany();
}

export async function getEventById(eventId) {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
}

export async function createEvent(eventData) {
  return await prisma.event.create({
    data: eventData,
  });
}

export async function updateEvent(eventId, updateData) {
  return await prisma.event.update({
    where: { id: eventId },
    data: updateData,
  });
}

export async function deleteEvent(eventId) {
  return await prisma.event.delete({
    where: { id: eventId },
  });
}
