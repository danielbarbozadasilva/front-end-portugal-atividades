import { IPaymentMethod } from './interfaces.paymentMethod';
import { IUser as IUserInterface } from './interfaces.index';

type userTypes = 'administrator' | 'client' | 'agent' | 'manager' | 'support' | 'developer';

interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IUser {
  hash: string;
  salt: string;
  name: string;
  email: string;
  username: string;
  permissions: userTypes[];
  recovery?: {
    token?: string;
    date?: Date;
  };
  refreshToken?: {
    data: string;
    expiresIn: number;
    iv: string;
  };
  createdAt: Date;
  updatedAt: Date;
  wasNew?: any;
}

export interface IClient {
  _id: string;
  user: IUserInterface;
  name: string;
  birthDate: Date;
  cpf: string;
  phones: string[];
  deleted: boolean;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  paymentMethods: IPaymentMethod;
  interests: string[];
}
