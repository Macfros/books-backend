import { Router } from 'express';
import { deleteUserReview, postReview, updateUserReview } from '../controllers/reviewController';
import { requireAuth } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';
import { reviewSchema } from '../validators/review.validator';

const router = Router();

router.post('/:id/reviews', requireAuth, validateRequest(reviewSchema), postReview);
router.put('/reviews/:id', requireAuth, validateRequest(reviewSchema), updateUserReview);
router.delete('/reviews/:id', requireAuth, deleteUserReview);

export default router;
