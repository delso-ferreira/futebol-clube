import { ILoginModel } from '../Interfaces/Login/ILoginModel';
import UserModel from '../database/models/UserModel';
import IUsers from '../Interfaces/Users/IUsers';

export default class LoginModel implements ILoginModel {
  private model = UserModel;

  async findByEmail(email: string): Promise<IUsers | null> {
    const find = await this.model.findOne({
      where: { email },
    });
    return find;
  }
}
