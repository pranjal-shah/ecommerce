import logger from "../utils/logger/logger.js";

// Middleware to log HTTP requests
const loggerMiddleware = (req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
};

export default loggerMiddleware;