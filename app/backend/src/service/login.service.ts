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
    const user = await this.model.findByEmail(email);
    if (!user) {
      return { status: 'BAD_REQUEST', data: { message: 'Invalid email or password' } };
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return { status: 'BAD_REQUEST', data: { message: 'Invalid email or password' } };
    }

    const token = this.tokenService.sign({
      id: user.id,
    });

    return { status: 'SUCESS', data: { token } };
  }

  async findToken(role: string) : Promise<ServiceResponse<string>> {
    const find = await this.model.findById(role);
    if (!find) {
      return { status: 'NOT_FOUND', data: { message: 'NOT FOUND' } };
    }
    const user = this.tokenService.sign({
      role: find,
    });
    console.log(user, 'USER DA SERVICE');

    return { status: 'SUCESS', data: user };
  }
}
