import express from 'express';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import {validateUser, validateUpdateUser, validateRegisterUser} from '../middleware/userValidators.js';
import loginLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', validateRegisterUser, signUpHandler);
router.post('/login', loginLimiter, validateUser, logInHandler);

export default router;
