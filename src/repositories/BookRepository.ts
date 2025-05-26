import mongoose from 'mongoose';
import { GetBooksOptions } from '../interfaces/Books/GetBookOptions';
import IBook from '../interfaces/IBook';
import Book from '../models/BookModel';
import Review from '../models/ReviewModel';

export const createBook = async (bookData: Partial<IBook>): Promise<IBook> => {
  const book = new Book(bookData);
  return await book.save();
}

export const findBooks = async (options: GetBooksOptions): Promise<IBook[]> => {
  const { page, limit, author, genre } = options;

  const filter: Record<string, any> = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;

  return await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });
};


export const findBookById = async (bookId: string) => {
  return Book.findById(bookId);
};

export const getPaginatedReviewsForBook = async (
  bookId: string,
  page: number,
  limit: number
) => {
  const reviews = await Review.find({ bookId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('userId', 'username'); // optional: shows who wrote each review

  const avg = await Review.aggregate([
    { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: null, averageRating: { $avg: '$rating' } } }
  ]);

  return {
    reviews,
    averageRating: avg[0]?.averageRating || 0
  };
};