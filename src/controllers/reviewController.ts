import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { deleteReview, submitReview, updateReview } from '../services/ReviewService';

export const postReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id: bookId } = req.params;
    const userId = req.user?.id;
    const { rating, comment } = req.body;

    const result = await submitReview(bookId, userId!, rating, comment);
    res.status(201).json({
      message: 'Review submitted successfully',
      review: result.review,
      averageRating: result.averageRating
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};



export const updateUserReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const reviewId = req.params.id;
    const userId = req.user?.id;
    const { rating, comment } = req.body;

    const result = await updateReview(reviewId, userId!, rating, comment);

    res.status(200).json({
      message: 'Review updated successfully',
      review: result.review,
      averageRating: result.averageRating
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteUserReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const reviewId = req.params.id;
    const userId = req.user?.id;

    const result = await deleteReview(reviewId, userId!);

    res.status(200).json({
      message: 'Review deleted successfully',
      averageRating: result.averageRating
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};