import { Request, Response } from 'express';
import LoginService from '../service/login.service';
import MapResponseStatus from '../utils/MapResponseStatus';

interface AuthToken {
  authorization: string,
}

export default class LoginController {
  constructor(
    private loginservice = new LoginService(),
    /* private tokenService : IJwt = new JsonWebTokenAdapter(), */
  ) {}

  static tokenExtractor(bearer: string) {
    return bearer.split(' ')[1];
  }

  public async loginAcess(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    const find = await this.loginservice.loginAcess(email, password);
    return res.status(MapResponseStatus(find.status)).json(find.data);
  }

  public async tokenResponse(req: Request, res: Response) {
    const { authorization } = req.headers as AuthToken;
    if (!authorization) {
      return res.status(500).json();
    }
    const token = LoginController.tokenExtractor(authorization);
    console.log(token, 'TOKEN DO CONTROLER');
    const { status, data } = await this.loginservice.findToken(token);
    return res.status(MapResponseStatus(status)).json(data);
  }
}
