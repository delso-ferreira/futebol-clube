import { Request, Response } from 'express';
import LoginService from '../service/login.service';

export default class LoginController {
  constructor(
    private loginservice = new LoginService(),
  ) {}

  public async loginAcess(req: Request, res: Response) {
    const { email, password } = req.body;
    const find = await this.loginservice.loginAcess(email, password);
    return res.status(200).json(find.data);
  }
}
