import mongoose, { Schema, Document, Types } from 'mongoose';
import { IReview } from '../interfaces/IReview';


const ReviewSchema = new Schema<IReview>({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

ReviewSchema.index({ bookId: 1, userId: 1 }, { unique: true }); // Enforce one review per user per book

export default mongoose.model<IReview>('Review', ReviewSchema);
