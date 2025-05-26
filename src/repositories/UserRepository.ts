import { IUser } from '../interfaces/IUser';
import User from '../models/UserModel';

export const createUser = async (username: string, password: string): Promise<IUser> => {
  const user = new User({ username, password });
  return await user.save();
};

export const findUserByUsername = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username }) as IUser | null;
};
