import { validationResult } from 'express-validator';

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    const emailConflict = messages.find((msg) =>
      msg.includes('already in use')
    );
    const seatConflict = messages.find((msg) => 
      msg.includes('already taken for this event')
    )
    if (emailConflict) {
      return res
        .status(409)
        .json({ error: emailConflict });
    }
    if (seatConflict) {
      return res
        .status(409)
        .json({ error: seatConflict });
    }
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
}
