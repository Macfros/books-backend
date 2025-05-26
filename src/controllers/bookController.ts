import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import * as BookService from '../services/BookService';

export const addBook = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBook = await BookService.createBook(req.body);
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', author, genre } = req.query;

    const safeLimit = Math.min(parseInt(limit as string) || 10, 10); // ✅ Cap at 10
    const books = await BookService.getBooks({
      page: parseInt(page as string) || 1,
      limit: safeLimit,
      author: author as string,
      genre: genre as string,
    });

    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1; //setting default page to 1
    const limit = Math.min(parseInt(req.query.limit as string) || 5, 10); // limiting the maximum limit to 10

    const result = await BookService.getBookWithReviews(id, page, limit);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};


