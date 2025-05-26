import { generateToken } from '../utils/jwtUtil';
import { createUser, findUserByUsername } from '../repositories/UserRepository';
import { IUser } from '../interfaces/IUser';

export const registerUser = async (username: string, password: string): Promise<IUser> => {
  const existing = await findUserByUsername(username);
  if (existing) throw new Error('Username already exists');
  return await createUser(username, password);
};

export const loginUser = async (username: string, password: string): Promise<string> => {
  const user = await findUserByUsername(username);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  return generateToken({ id: user._id.toString() });
};
