import { validationResult } from 'express-validator';

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    const emailConflict = messages.find((msg) =>
      msg.includes('already in use')
    );
    if (emailConflict) {
      return res
        .status(409)
        .json({ error: emailConflict });
    }
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
}
