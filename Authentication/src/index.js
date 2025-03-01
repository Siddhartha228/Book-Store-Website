import express from "express";
import cors from "cors"; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./database/index.js";
import { userRouter } from "./route/index.js";
import { authRouter } from "./route/index.js";
import { authenticateToken } from "./middleware/token-middleware.js";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import { adminloginRouter } from "./route/adminlogin/adminloginRoute.js";
import bookRouter from "./route/bookRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"] 
}));

console.log("CORS middleware applied for origin: http://localhost:5137");

// Middleware (keep existing order)
app.use(bodyParser.json());
app.use(authenticateToken);

// API Routes (keep existing routes)
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/file", router);
app.use("/api/adminlogin", adminloginRouter);
app.use("/api/books", bookRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Start server with error handling
app.listen(port, async function () {
  console.log("Project running on port " + port);
  
  try {
    await db().catch(error => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Server startup error:", error);
  }
});