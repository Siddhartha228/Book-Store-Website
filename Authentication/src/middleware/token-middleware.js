import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
  try {
    const publicRoutes = [
      "/api/adminlogin/login",
      "/api/adminlogin/create",
      "/api/test" // Add more public routes if needed
    ];

    // Skip authentication for public routes
    if (publicRoutes.some(route => req.originalUrl.includes(route))) {
      return next();
    }

    // Get token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token

    if (!token) {
      console.warn(`Unauthorized access attempt to ${req.originalUrl}`);
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        errorCode: "TOKEN_MISSING",
      });
    }

    // Verify the token using the secret key from .env
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error("TokenMiddleware Error: Missing JWT secret key in environment variables");
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. JWT secret key is missing.",
      });
    }

    // Verify token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token.",
        });
      }
      req.user = user;
      next(); // Proceed to next middleware or route handler
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
}
