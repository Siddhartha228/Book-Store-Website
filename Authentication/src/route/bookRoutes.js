import express from 'express';
import { 
  createBook, 
  getBooks, 
  deleteBook // Add this import
} from '../controller/bookController.js';
import { authenticateToken } from '../middleware/token-middleware.js';

const router = express.Router();

// Existing routes
router.post('/', authenticateToken, createBook);
router.get('/', getBooks);

// Add this new delete route
router.delete('/:id', authenticateToken, deleteBook);

export default router;