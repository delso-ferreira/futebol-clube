import { NextFunction, Request, Response } from 'express';
import LoginModel from '../models/LoginModel';

interface Login {
  email: string,
  password: string,
}

export default class LoginValidation {
  loginUser = new LoginModel();

  static validNumber = 6;

  static checkEmail(email: string): boolean {
    const rgx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return rgx.test(email);
  }

  static loginExists(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as unknown as Login;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  static validEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body as unknown as Login;
    if (!LoginValidation.checkEmail(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validPassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body as unknown as Login;
    if (password.length < LoginValidation.validNumber) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
