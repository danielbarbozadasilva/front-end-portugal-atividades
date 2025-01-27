import { IClient } from "./models.client";
import { IOrder } from "./models.order";

export interface ISolicitation {
  _id: string;
  cart: any;
  solicitationNumber: number;
  client: IClient;
  order: IOrder[];
  canceled: boolean;
  createdAt: Date;
  updatedAt: Date;
}