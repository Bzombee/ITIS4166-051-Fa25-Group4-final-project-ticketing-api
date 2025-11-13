import { handleValidationErrors } from './handleValidationErrors.js';
import { body, oneOf } from 'express-validator';
import { existsEmail } from '../repositories/userRepo.js';

export const validateUser = [
  
  body('email')
    .exists({ values: 'false' })
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

  body('password')
    .exists({ values: 'false' })
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'password must contain at least 8 characters and at most 64 characters',
    ),

  handleValidationErrors,
];

export const validateRegisterUser = [
  body('name')
    .exists({ values: 'false'})
    .withMessage('name is required')
    .bail(),
  
  body('email')
    .exists({ values: 'false' })
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

  body('birthday')
    .exists({ value: 'false' })
    .withMessage('birthday is required')
    .bail()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('Date must be in YYYY-MM-DD format and a valid date.'),

  body('password')
    .exists({ values: 'false' })
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'password must contain at least 8 characters and at most 64 characters',
    ),

  handleValidationErrors,
];

// Maybe not needed? Keeping it for now.

 export const validateUpdateUser = [
   oneOf(
     [
       body('name').exists({ values: 'falsy' }),
       body('email').exists({ values: 'falsy' }),
       body('birthday').exists({ values: 'falsy' }),
       body('password').exists({ values: 'falsy' }),
     ],
     {
       message: 'At least one field (name, email, birthday, password) must be provided',
     },
   ),

   body('name')
     .optional()
     .trim()
     .isString()
     .withMessage('name must be a string')
     .bail(),

   body('email')
     .optional()
     .trim()
     .isString()
     .withMessage('email must be a string')
     .bail()
     .isEmail()
     .withMessage('email is not valid')
     .normalizeEmail()
     .custom(async (value) => {
       if (await existsEmail(value)) {
         return Promise.reject(
           `The email ${value.toLowerCase()} is already in use.`,
         );
       }
       return true;
     }),

   body('birthday')
     .optional()
     .trim()
     .escape()
     .isDate({ format: 'YYYY-MM-DD', strictMode: true })
     .withMessage('Date must be in YYYY-MM-DD format and a valid date.'),

   body('password')
     .optional()
     .trim()
     .escape()
     .isLength({ min: 8, max: 64 })
     .withMessage(
       'password must contain at least 8 characters and at most 64 characters',
     ),

   handleValidationErrors,
 ];


const validRoles = ["USER", "ADMIN", "ORGANIZER"]
export const validateUpdateUserRole = [
  body("role")
    .trim()
    .escape()
    .exists({ checkFalsy: true })
    .withMessage("must include role")
    .bail()
    .isIn(validRoles)
    .withMessage(`Role must be one of: ${validRoles.join(", ")}`),
,

    handleValidationErrors,
]
