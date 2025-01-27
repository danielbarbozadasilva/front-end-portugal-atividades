import { Address } from "cluster";
import { IOrder } from "./models.order";
type ITypePayment = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';
type IStatusSituation = 'pending' | 'processing' | 'completed' | 'canceled';

export interface IPayment {
  _id: string,
  order: IOrder[];
  price: number;
  type: ITypePayment;
  installments: number;
  status: IStatusSituation;
  address: Address;
  card: any[];
  addressDeliveryIgualCharging: boolean;
  gatewayTransactionId: string;
  gatewayData: any;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
