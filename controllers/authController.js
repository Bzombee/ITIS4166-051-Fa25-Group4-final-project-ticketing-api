import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export async function signUpHandler(req, res, next) {
  try {
    const { name, email, password, birthday, role = 'CUSTOMER' } = req.body;

    const existing = await userService.getUserByEmail(email);

    if (existing) {
      return res.status(409).json({ error: 'email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
      name,
      email,
      password: hashed,
      birthday: new Date(birthday),
      role,
    });

    res.status(201).json({
      message: `user created with id of ${user.id}`,
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logInHandler(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
