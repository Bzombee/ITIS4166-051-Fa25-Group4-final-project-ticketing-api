import express from 'express';
import { getAllUserHandler, getUserHandler, updateUserHandler, deleteUserHandler, updateUserRoleHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authroizeRoles } from '../middleware/authorizeRoles.js';
import { validateUpdateUser, validateUpdateUserRole } from '../middleware/userValidators.js';

const router = express.Router();

router.get('/', authenticate, authroizeRoles('ADMIN'), getAllUserHandler);
router.get('/me', authenticate, getUserHandler);
router.put('/me', authenticate, validateUpdateUser, updateUserHandler);
router.delete('/me', deleteUserHandler);
router.patch('/:id/role', authenticate, authroizeRoles('ADMIN'), validateUpdateUserRole, updateUserRoleHandler);

export default router;
