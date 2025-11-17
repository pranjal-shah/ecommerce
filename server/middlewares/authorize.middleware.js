const authorizeMiddleware = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user || !role.includes(req.user.role)) {
        const error = new Error("Forbidden: You are not authorized to access this resource");
        error.statusCode = 403;
        return next(error);
      }

      next();
    } catch (error) {
      error.statusCode = 403;
      error.message = "Forbidden";
      next(error);
    }
  };
};

export default authorizeMiddleware;