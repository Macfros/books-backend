import Book from '../models/BookModel';
import IBook from '../interfaces/IBook';
import * as BookRepository from '../repositories/BookRepository';
import { GetBooksOptions } from '../interfaces/Books/GetBookOptions';

export const createBook = async (bookData: Partial<IBook>): Promise<IBook> => {
  const book = await BookRepository.createBook(bookData);
  return book;
};


export const getBooks = async (options: GetBooksOptions): Promise<IBook[]> => {
  return await BookRepository.findBooks(options);
};


export const getBookWithReviews = async (
  bookId: string,
  page: number,
  limit: number
) => {
  const book = await BookRepository.findBookById(bookId);
  if (!book) throw new Error('Book not found');

  const { reviews, averageRating } = await BookRepository.getPaginatedReviewsForBook(
    bookId,
    page,
    limit
  );

  // inject averageRating into the book object dynamically
  const bookWithRating = {
    ...book.toObject(), // flatten Mongoose doc
    averageRating
  };

  return {
    book: bookWithRating,
    reviews
  };
};
