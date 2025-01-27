import { IPaymentMethod } from "./models.paymentMethod";
import { IUser } from "./models.user";

interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IClient {
  _id: string;
  user: IUser;
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
