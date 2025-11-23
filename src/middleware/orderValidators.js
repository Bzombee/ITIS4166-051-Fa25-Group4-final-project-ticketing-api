import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateOrder = [
  body('ticketIds')
    .exists().withMessage('ticketIds is required')
    .isArray({ min: 1 }).withMessage('ticketIds must be a non-empty array')
    .custom((ticketIds) => {
      const allNumbers = ticketIds.every(
        (id) => !isNaN(parseInt(id, 10))
      );

      if (!allNumbers) {
        throw new Error('All ticketIds must be numeric');
      }

      return true;
    }),

  handleValidationErrors
];