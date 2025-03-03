import express from "express";
import { 
  createOrder, 
  getOrders, 
  updateOrderStatus 
} from "../controller/orderController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.post("/", authenticateToken, createOrder);
router.get("/", authenticateToken, getOrders);
router.put("/:id/status", authenticateToken, updateOrderStatus);

export default router;