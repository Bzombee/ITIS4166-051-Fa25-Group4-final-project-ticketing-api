import express from 'express';
import {
  validateUserCreate,
  validateUserUpdate,
} from '../middleware/userValidators.js';
import * as controller from '../controllers/userController.js';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateUserCreate, controller.create);
router.put('/:id', validateUserUpdate, controller.update);

router.delete('/:id', controller.remove);

export default router;
