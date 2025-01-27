import { IAgent } from "./models.agent";
import { IClient } from "./models.client";
import { IGroup } from "./models.group";
import { IRating } from "./models.rating";

type ActivityCategory = 'Passeio' | 'Excursão' | 'Evento' | 'Outro';
type allowedPaymentMethods = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';

export interface IActivity {
  _id: string,
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  location: string;
  meetingPoint?: string;
  price: number;
  featured: boolean;
  promotion?: string;
  images: string[];
  videos?: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string;
  category: ActivityCategory;
  agent: IAgent;
  rating: IRating[];
  likes: IClient[];
  client: IClient[];
  shareCount: number;
  groups: IGroup[];
  allowedPaymentMethods: allowedPaymentMethods;
  createdAt: Date;
  updatedAt: Date;
}
