export const validateOrder = (req, res, next) => {
  const { ticketIds } = req.body;

  if (!ticketIds) {
    return res.status(400).json({ error: 'ticketIds is required' });
  }

  if (!Array.isArray(ticketIds) || ticketIds.length === 0) {
    return res
      .status(400)
      .json({ error: 'ticketIds must be a non-empty array' });
  }

  next();
};
