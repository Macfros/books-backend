import { Router } from 'express';
import { addBook, getAllBooks, getBookById } from '../controllers/bookController';
import { requireAuth } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';
import { bookSchema } from '../validators/book.validator';
import { getActiveResourcesInfo } from 'process';

const router = Router();

router.post('/', requireAuth, validateRequest(bookSchema), addBook);
router.get('/',requireAuth, getAllBooks);
router.get('/:id', requireAuth, getBookById);


export default router;
