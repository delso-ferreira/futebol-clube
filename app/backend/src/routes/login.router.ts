import { Request, Response, Router } from 'express';
import LoginController from '../controller/login.controller';
import LoginValidation from '../middlewares/login.middleware';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  LoginValidation.validPassword,
  LoginValidation.validEmail,
  (req: Request, res: Response) => loginController.loginAcess(req, res),
);

export default router;
