import { Request, Response, Router } from 'express';
import LoginController from '../controller/login.controller';
import LoginValidation from '../middlewares/login.middleware';
import TokenValidation from '../middlewares/token.middleware';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  LoginValidation.loginExists,
  LoginValidation.validEmail,
  LoginValidation.validPassword,
  (req: Request, res: Response) => loginController.loginAcess(req, res),
);

router.get(
  '/role',
  TokenValidation.findToken,
  (req: Request, res: Response) => loginController.tokenResponse(req, res),
);

export default router;
