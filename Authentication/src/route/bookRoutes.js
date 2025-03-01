
import express from 'express';
import { createBook, getBooks } from '../controller/bookController.js';
import { authenticateToken } from '../middleware/token-middleware.js';

const router = express.Router();

router.post('/', authenticateToken, createBook);
router.get('/', getBooks);

export default router;