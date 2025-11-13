import {getAllUsers, getUser, updateUser, deleteUser, updateUserRole} from '../services/userService.js';
import bcrypt from 'bcrypt';

export async function getAllUserHandler(req, res, next) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function getUserHandler(req, res, next) {
  const user = await getUser(req.user.id);
  res.status(200).json(user);
}

export async function updateUserHandler(req, res, next) {
  let id = parseInt(req.user.id);
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.email) updates.email = req.body.email;
  if (req.body.birthday) updates.email = req.body.birthday;
  if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);

  const updatedUser = await updateUser(id, updates);
  res.status(200).json(updatedUser);

}

export async function deleteUserHandler(req, res, next) {
  let id = parseInt(req.user.id);
  await deleteUser(id);
  res.status(204).send();
}

export async function updateUserRoleHandler(req, res) {
    let id = parseInt(req.params.id);
    let updates = req.body;
    const updatedUserRole = await updateUserRole(id, updates);
    res.status(200).json(updatedUserRole);
}