import Review from '../models/ReviewModel';
import Book from '../models/BookModel';
import mongoose from 'mongoose';
import { IReview } from '../interfaces/IReview';

export const upsertReview = async (
  bookId: string,
  userId: string,
  rating: number,
  comment?: string
): Promise<IReview> => {
  const review = await Review.findOneAndUpdate(
    { bookId, userId },
    { rating, comment },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return review;
};

export const recalculateAverageRating = async (bookId: string): Promise<number> => {
  const result = await Review.aggregate([
    { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: null, average: { $avg: '$rating' } } }
  ]);

  const avg = result[0]?.average || 0;

  await Book.findByIdAndUpdate(bookId, { averageRating: avg });
  return avg;
};


export const updateUserReview = async (
  reviewId: string,
  userId: string,
  rating: number,
  comment?: string
) => {
  const review = await Review.findOneAndUpdate(
    { _id: reviewId, userId },
    { rating, comment },
    { new: true }
  );

  if (!review) {
    throw new Error('Review not found or unauthorized');
  }
  return review;
};


export const deleteUserReview = async (reviewId: string, userId: string) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, userId });

  if (!review) {
    throw new Error('Review not found or unauthorized');
  }

  return review;
};