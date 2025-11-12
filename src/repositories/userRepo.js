import prisma from '../config/prismaClient.js';

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: id },
  });
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function create(userData) {
  return await prisma.user.create({
    data: userData,
  });
}

export async function updateUser(userId, updateData) {
  return await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
}

export async function deleteUser(userId) {
  return await prisma.user.delete({
    where: { id: userId },
  });
}
