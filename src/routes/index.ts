import { Application } from 'express';
import authRoutes from './AuthRoutes';
import bookRoutes from './BookRoutes';
import reviewRoutes from './ReviewRoutes';

export const registerRoutes = (app: Application): void => {
  app.use('/api/auth', authRoutes);
  app.use('/api/books',bookRoutes);
  app.use('/api/books', reviewRoutes);

  // Add more routes here as you grow:
  // app.use('/api/books', bookRoutes);
  // app.use('/api/reviews', reviewRoutes);
};