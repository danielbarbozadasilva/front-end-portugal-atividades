export type PageTitle = {
  title: string;
};

export interface ISignUpInterface {
  user: string;
  name: string;
  birthDate: Date;
  cpf: string;
  phones: string[];
  email: string;
  password: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  interests: string[];
}

export interface IClient {
  _id: string;
  user: IUser;
  name: string;
  birthDate: Date;
  cpf: string;
  phones: string[];
  deleted: boolean;
  address: any;
  createdAt: Date;
  updatedAt: Date;
  paymentMethods: IPaymentMethod;
  interests: string[];
}

type IBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Elo' | 'Other';
type ITypePaymentMethod = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';

export interface IPaymentMethod {
  _id: string;
  client: IClient[];
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

export interface IUser {
  name: string
  username: string
  email: string
  cpf: string
  birthDate: string
  picture?: any
  country: string
  phone: string
  description: string
  permissions?: string[]
  hash?: string
  salt?: string
  recovery?: {
    token: string,
    date: Date
  },
  isSeller: boolean
  files?: boolean,
  password?: string | null
}
export interface SignUpProps {
  title: string;
  submit: (clientData: IClient) => void;
}