import mongoose, { Schema, Document, Types } from 'mongoose';
import IBook from '../interfaces/IBook';


const BookSchema = new Schema<IBook>({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  genre: { type: String, required: true },
  description: { type: String },
  averageRating: { type: Number, default: 0 },
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model<IBook>('Book', BookSchema);
