export const validateOrder = (req, res, next) => {
  const { userId, ticketIds } = req.body;

  if (!userId || !ticketIds) {
    return res.status(400).json({ error: 'userId and ticketIds are required' });
  }

  if (!Array.isArray(ticketIds) || ticketIds.length === 0) {
    return res
      .status(400)
      .json({ error: 'ticketIds must be a non-empty array' });
  }

  next();
};
