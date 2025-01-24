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

interface IPaymentMethod {
  _id: string;
  client: string;
  type: string;
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  fingerprint?: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUser {
  hash: string;
  salt: string;
  name: string;
  email: string;
  username: string;
  permissions: string[];
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