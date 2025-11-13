import {findAllUsers, findUser, update, remove, updateRole} from '../repositories/userRepo.js';

export async function getAllUsers() {
  return await findAllUsers();
}

export async function getUser(id) {
  return await findUser(id);
}

export async function updateUser(id, updateData) {
  const updatedUser = await update(id, updateData);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteUser(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function updateUserRole(id, updates) {
    const updatedUser = await updateRole(id, updates);
    if (updatedUser) return updatedUser;
    else {
        const error = new Error(`Cannot find user with id ${id}`);
        error.status = 404;
        throw error;
    }
}