import { rateLimit } from 'express-rate-limit';

const LogInLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: process.env.NODE_ENV === 'test' ? 1000 : 3,
  handler: (req, rest, next) => {
    const error = new Error('Too many login requests. Try again later');
    error.status = 429;
    next(error);
  },
});

export default LogInLimiter;
