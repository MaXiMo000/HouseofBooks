import { Router } from 'express';
const router = Router();
import { getBooks, addBook, deleteBook } from '../controller/admin.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

// Listing stays public -- it is the same catalogue the storefront shows.
router.get('/', getBooks);

// Writes did not check anything at all: any request on the internet could add
// or delete a book. Admin only now.
router.post('/add', verifyToken, requireAdmin, addBook);
router.delete('/:id', verifyToken, requireAdmin, deleteBook);

export default router;
