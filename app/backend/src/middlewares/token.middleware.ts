import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

interface AuthToken {
  authorization: string,
}

export default class TokenValidation {
  static tokenExtractor(bearer: string) {
    return bearer.split(' ')[1];
  }

  static findToken(req: Request, res: Response, next: NextFunction) : void {
    const { authorization } = req.headers as unknown as AuthToken;
    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }
    const token = TokenValidation.tokenExtractor(authorization);
    console.log(token);
    const user = decode(token);
    if (!user) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
    res.locals.user = user;
    next();
  }
}
