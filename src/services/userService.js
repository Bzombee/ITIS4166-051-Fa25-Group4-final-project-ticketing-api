import * as userRepo from '../repositories/userRepo.js';

export async function getAllUsers() {
  return await userRepo.getAllUsers();
}

export async function getUserById(id) {
  return await userRepo.getUserById(id);
}

export async function getUserByEmail(email) {
  return await userRepo.getUserByEmail(email);
}

export async function createUser(data) {
  return await userRepo.create(data);
}

export async function updateUser(id, updateData) {
  return await userRepo.updateUser(id, updateData);
}

export async function deleteUser(id) {
  return await userRepo.deleteUser(id);
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
