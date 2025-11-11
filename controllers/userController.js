import * as userService from '../services/userService.js';

export async function getAllUserHandler(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(parseInt(id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUserHandler(req, res, next) {
  try {
    const { name, email, password, birthday, role = 'CUSTOMER' } = req.body;
    const user = await userService.createUser({
      name,
      email,
      password,
      birthday: new Date(birthday),
      role,
    });
    res.status(201).json({
      message: `user created with id of ${user.id}`,
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserHandler(req, res, next) {
  try {
    const { id } = req.params;
    const data = {};
    if (req.body.name !== undefined) data.name = req.body.name;
    if (req.body.birthday !== undefined)
      data.birthday = new Date(req.body.birthday);
    const user = await userService.updateUser(parseInt(id), data);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated', userId: user.id });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserHandler(req, res, next) {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id));
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
}
