import { handleValidationErrors } from './handleValidationErrors.js';
import { body, oneOf } from 'express-validator';

const validEventTypes = ["SPORTS", "MUSIC", "MOVIES", "OTHER"];
export const validateEvent = [
  body('title')
    .exists({ values: 'false'})
    .withMessage('title is required')
    .isLength({min: 3})
    .withMessage("title must be a length of 3")
    .bail(),

  body('date')
    .exists({ value: 'false' })
    .withMessage('date is required')
    .bail()
    .isISO8601()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('Invalid date format. Please use ISO 8601 format (e.g., 2025-12-01 or 2025-12-01T18:00:00Z)')
    .bail(),

  body('location')
    .exists({ values: 'false'})
    .withMessage('location is required')
    .isLength({min: 3})
    .withMessage("location must be a length of 3")
    .bail(),

  body('description')
    .exists({ values: 'false'})
    .withMessage('description is required')
    .isLength({min: 3})
    .withMessage("description must be a length of 3")
    .bail(),

  body('eventType')
      .exists({ checkFalsy: true })
      .withMessage('event type is required')
      .bail()
      .isIn(validEventTypes)
      .withMessage(`eventType must be one of: ${validEventTypes.join(', ')}`),

  body('ticketsAvailable')
    .exists({value: 'false'})
    .withMessage('ticketsAvailable is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('ticketsAvailable must be a positive integer'),

    handleValidationErrors,
];


export const validateEventUpdate = [
  oneOf(
     [
      body('title').exists({ values: 'falsy' }),
      body('date').exists({ values: 'falsy' }),
      body('location').exists({ values: 'falsy' }),
      body('eventType').exists({ values: 'falsy' }),
      body('date').exists({ values: 'falsy' }),
      body('ticketsAvailable').exists({ values: 'falsy' }),
     ],
     {
       message: 'At least one field (title, date, location, eventType, date, ticketsAvailable) must be provided',
     },
   ),

  body('title')
    .optional()
    .exists({ values: 'false'})
    .withMessage('title is required')
    .isLength({min: 3})
    .withMessage("title must be a length of 3")
    .bail(),

  body('date')
    .optional()
    .exists({ value: 'false' })
    .withMessage('date is required')
    .bail()
    .isISO8601()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('Invalid date format. Please use ISO 8601 format (e.g., 2025-12-01 or 2025-12-01T18:00:00Z)')
    .bail(),

  body('location')
    .optional()  
    .exists({ values: 'false'})
    .withMessage('location is required')
    .isLength({min: 3})
    .withMessage("location must be a length of 3")
    .bail(),

  body('description')
    .optional()
    .exists({ values: 'false'})
    .withMessage('description is required')
    .isLength({min: 3})
    .withMessage("description must be a length of 3")
    .bail(),

  body('eventType')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage('event type is required')
    .bail()
    .isIn(validEventTypes)
    .withMessage(`eventType must be one of: ${validEventTypes.join(', ')}`),

  body('ticketsAvailable')
    .optional()
    .exists({value: 'false'})
    .withMessage('ticketsAvailable is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('ticketsAvailable must be a positive integer'),

    handleValidationErrors,
];