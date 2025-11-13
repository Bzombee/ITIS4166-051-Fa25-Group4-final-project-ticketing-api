import prisma from '../config/db.js';

export async function createUser(data) {
  return await prisma.user.create({data: data, omit: {password: true}});
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}


export async function findAllUsers() {
  return await prisma.user.findMany({
    omit: {password: true}
  });
}

export async function findUser(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true}
  });
}

export async function update(userId, updateData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: updateData,
      omit: { password: true },
    });
    return updatedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(userId) {
try {
    const deletedUser = await prisma.user.delete({
      where: { userId },
    });
    return deletedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function updateRole(userId, updates) {
  try {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: updates,
      omit: { password: true },
    });
    return updatedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function existsEmail(email) {
  const result = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
    select: { id: true },
  });

  return result !== null;
}
