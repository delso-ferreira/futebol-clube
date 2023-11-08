import { Request, Response } from 'express';
import LoginService from '../service/login.service';
import MapResponseStatus from '../utils/MapResponseStatus';

export default class LoginController {
  constructor(
    private loginservice = new LoginService(),
  ) {}

  public async loginAcess(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    const find = await this.loginservice.loginAcess(email, password);
    return res.status(MapResponseStatus(find.status)).json(find.data); // fazer mapresponse
  }
}
