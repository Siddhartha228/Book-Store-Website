import express from 'express';
import { 
  createBook, 
  getBooks, 
  deleteBook, 
  updateBook
} from '../controller/bookController.js';
import { authenticateToken } from '../middleware/token-middleware.js';

const router = express.Router();

router.post('/', authenticateToken, createBook);
router.get('/', getBooks);
router.delete('/:id', authenticateToken, deleteBook);
router.put('/:id', authenticateToken, updateBook);

export default router;