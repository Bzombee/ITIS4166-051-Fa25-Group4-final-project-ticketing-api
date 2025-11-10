export const authenticate = (req, res, next) => {
  next();
};

export const authorize =
  (..._roles) =>
  (req, res, next) => {
    next();
  };
