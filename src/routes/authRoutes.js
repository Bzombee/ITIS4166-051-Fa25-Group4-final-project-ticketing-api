import express from 'express';
import {
  validateUser,
  validateUserCreate,
} from '../middleware/userValidators.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', validateUserCreate, signUpHandler);
router.post('/login', validateUser, logInHandler);

export default router;
