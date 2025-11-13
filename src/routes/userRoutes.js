import express from 'express';
import {
  validateUserCreate,
  validateUserUpdate,
} from '../middleware/userValidators.js';
import { getAllUserHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUserHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', validateUserCreate, createUserHandler);
router.put('/:id', validateUserUpdate, updateUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;
