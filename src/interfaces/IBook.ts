import { Types } from "mongoose";

export default interface IBook extends Document {
    _id: Types.ObjectId;
  title: string;
  author: string;
  genre: string;
  description?: string;
  averageRating: number;
  createdAt: Date;
}