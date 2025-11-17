import logger from "../utils/logger/logger.js";

const errorMiddleware = (err, req, res, next) => {
  logger.error(
    `${req.method} ${req.originalUrl} - ${err.statusCode} ${err.message}`
  );
  if (!err.statusCode) {
    err.statusCode = 500;
    return res
      .status(err.statusCode)
      .json({ error: true, message: err.message || "Internal Server Error" });
  }
  return res
    .status(err.statusCode)
    .json({ error: true, message: err.message, errors: err.errors });
};

export default errorMiddleware;
