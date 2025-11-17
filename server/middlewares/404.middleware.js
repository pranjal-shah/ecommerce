import logger from "../utils/logger/logger.js";

const unknownRoutesMiddleware = (req, res, next) => {
  logger.warn(`${req.method} ${req.originalUrl} - Invalid URL`);
  res.status(404).json({ error: true, message: "Invalid URL" });
};

export default unknownRoutesMiddleware;
