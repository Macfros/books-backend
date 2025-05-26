import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

//signup route for new users
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await AuthService.registerUser(username, password);
    res.status(201).json({ message: 'User created', user: { id: user._id, username: user.username } });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


//login route for existing users
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await AuthService.loginUser(username, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
