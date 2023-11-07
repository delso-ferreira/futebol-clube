import * as jwt from 'jsonwebtoken';
import { IJwt } from './Ijwt';

export default class JsonWebTokenAdapter implements IJwt {
  private jwt = jwt;

  static secret = process.env.JWT_TOKEN ?? 'jwt_secret';

  sign(payload: object): string {
    return this.jwt.sign(payload, JsonWebTokenAdapter.secret);
  }

  verify(token: string): object {
    return this.jwt.verify(token, JsonWebTokenAdapter.secret) as object;
  }
}
