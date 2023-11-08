import IUser from '../Users/IUsers';

export interface ILoginModel {
  findByEmail(email: string) : Promise<IUser | null>
  findById(role: string) : Promise<IUser | null>
}
