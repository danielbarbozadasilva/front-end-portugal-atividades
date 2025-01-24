type IBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Elo' | 'Other';
type ITypePaymentMethod = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';

export interface IPaymentMethod {
  _id: string;
  client: IClient;
  type: ITypePaymentMethod;
  brand?: IBrand;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  fingerprint?: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id: string,
  order: IOrder;
  price: number;
  type: string;
  installments: number;
  status: string;
  address: Address;
  card: any;
  addressDeliveryIgualCharging: boolean;
  gatewayTransactionId: string;
  gatewayData: any;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IOrder {
  _id: string;
  solicitation: ISolicitation;
  type: string;
  situation: string;
  date: Date;
  payload: any;
  voucher: string;
  used: boolean;
}

interface ISolicitation {
  _id: string;
  cart: any;
  solicitationNumber: string;
  client: IClient;
  order: string;
  canceled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IClient {
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