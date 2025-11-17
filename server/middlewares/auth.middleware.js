import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new Error("Unauthorized request. Token missing.");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Invalid or expired token";
    next(error);
  }
};

export default isAuthenticated;
