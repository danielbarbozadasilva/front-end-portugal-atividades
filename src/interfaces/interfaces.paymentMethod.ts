import { IClient } from "./models.client";

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
