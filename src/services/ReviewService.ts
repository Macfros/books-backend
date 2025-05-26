import * as ReviewRepository from '../repositories/ReviewRepository';

export const submitReview = async (
  bookId: string,
  userId: string,
  rating: number,
  comment?: string
) => {
  const review = await ReviewRepository.upsertReview(bookId, userId, rating, comment);
  const averageRating = await ReviewRepository.recalculateAverageRating(bookId);
  return { review, averageRating };
};


export const updateReview = async (
  reviewId: string,
  userId: string,
  rating: number,
  comment?: string
) => {
  const review = await ReviewRepository.updateUserReview(reviewId, userId, rating, comment);
  const newAverage = await ReviewRepository.recalculateAverageRating(review.bookId.toString());
  return { review, averageRating: newAverage };
};


export const deleteReview = async (reviewId: string, userId: string) => {
  const deleted = await ReviewRepository.deleteUserReview(reviewId, userId);
  const averageRating = await ReviewRepository.recalculateAverageRating(deleted.bookId.toString());
  return { averageRating };
};