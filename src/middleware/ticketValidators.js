import { body, oneOf } from "express-validator";
import { seatExistsInEvent } from "../repositories/ticketRepo.js";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateTicket = [
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("price is required")
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage("price must be a float greater than 0.01"),

  body("seatNumber")
    .exists({ checkFalsy: true })
    .withMessage("seatNumber is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("seatNumber must be at least 3 characters")
    .bail()
    .custom(async (value, { req }) => {
      const eventId = parseInt(req.params.eventId);

      const exists = await seatExistsInEvent(eventId, value);

      if (exists) {
        throw new Error(`Seat ${value} is already taken for this event.`);
      }

      return true;
    }),

  handleValidationErrors,
];

export const validateTicketUpdate = [
  oneOf(
     [
      body('price').exists({ values: 'falsy' }),
      body('seatNumber').exists({ values: 'falsy' }),
     ],
     {
       message: 'At least one field (price, seatNumber) must be provided',
     },
   ),

  body("price")
    .optional()
    .exists({ checkFalsy: true })
    .withMessage("price is required")
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage("price must be a float greater than 0.01"),

  body("seatNumber")
    .optional()
    .exists({ checkFalsy: true })
    .withMessage("seatNumber is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("seatNumber must be at least 3 characters")
    .bail()
    .custom(async (value, { req }) => {
      const eventId = parseInt(req.params.eventId);

      const exists = await seatExistsInEvent(eventId, value);

      if (exists) {
        throw new Error(`Seat ${value} is already taken for this event.`);
      }

      return true;
    }),

    handleValidationErrors,
];