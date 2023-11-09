import { Request, Response } from 'express';
import LoginService from '../service/login.service';
import MapResponseStatus from '../utils/MapResponseStatus';

export default class LoginController {
  constructor(
    private loginservice = new LoginService(),
  ) {}

  public async loginAcess(req: Request, res: Response) {
    const { email, password } = req.body;
    const find = await this.loginservice.loginAcess(email, password);
    return res.status(MapResponseStatus(find.status)).json(find.data);
  }

  public async tokenResponse(_req: Request, res: Response) {
    try {
      const { id } = res.locals.user;
      const role = await this.loginservice.findToken(id);
      return res.status(MapResponseStatus(role.status)).json({ role: role.data });
    } catch (error) {
      console.log((error as Error).message);
    }
  }
}
