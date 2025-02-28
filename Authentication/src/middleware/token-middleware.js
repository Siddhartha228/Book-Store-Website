import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateToken(req, res, next) {
  if (req.originalUrl.includes("/api/auth/signup") || req.originalUrl.includes("/api/adminlogin/login")) {
    return next(); // Skip token check for signup and admin login
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = decoded;
    next();
  });
}
