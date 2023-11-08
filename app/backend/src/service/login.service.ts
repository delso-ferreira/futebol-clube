import * as bcryptjs from 'bcryptjs';
import { IJwt } from '../utils/jwt/Ijwt';
import LoginModel from '../models/LoginModel';
import JsonWebTokenAdapter from '../utils/jwt/jwtAdapter';
import { ServiceResponse } from '../utils/ServiceResponse';
import Itoken from '../Interfaces/Token/IToken';
import { ILoginModel } from '../Interfaces/Login/ILoginModel';

export default class LoginService {
  constructor(
    private model : ILoginModel = new LoginModel(),
    private tokenService : IJwt = new JsonWebTokenAdapter(),
  ) {}

  async loginAcess(email: string, password: string) : Promise<ServiceResponse<Itoken>> {
    const login = await this.model.findByEmail(email);
    console.log(email, 'EU SOU O LOGIN');
    console.log(password, 'EU SOU O PASSWORD');
    if (!login) {
      return { status: 'BAD_REQUEST', data: { message: 'Invalid email or password' } };
    }

    if (!bcryptjs.compareSync(password, login.password)) {
      return { status: 'BAD_REQUEST', data: { message: 'Invalid email or password' } };
    }

    const token = this.tokenService.sign({
      user: login?.id,
    });

    return { status: 'SUCESS', data: { token } };
  }
}
