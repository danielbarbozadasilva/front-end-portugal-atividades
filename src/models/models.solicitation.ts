export interface ISolicitation {
  _id :string;
  cart: any;
  solicitationNumber: string;
  client: string;
  order: string;
  canceled: boolean;
  createdAt: Date;
  updatedAt: Date;
}