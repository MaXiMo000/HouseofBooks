import { Router } from 'express';
const router = Router();
import { getBooks, addBook, deleteBook } from '../controller/admin.controller.js';

// Define routes
router.get('/', getBooks);
router.post('/add', addBook);
router.delete('/:id', deleteBook);

export default router;
