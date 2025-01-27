import { IActivity } from "./models.activity";
import { IAgent } from "./models.agent";
import { IClient } from "./models.client";
import { IRating } from "./models.rating";

type categoryTypes = 'Passeios' | 'Gastronomia' | 'Aventura' | 'Cultura' | 'Bem-estar' | 'Compras' | 'Outros';

export interface ISolicitationCartItem  {
  _id: string;
  activity: IActivity;
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  location: string;
  meetingPoint: string;
  price: number;
  featured: boolean;
  promotion?: string; 
  images: string[];
  videos?: string[]; 
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string; 
  category: categoryTypes;
  agent:  IAgent[];
  rating: IRating[];
  likes:  IClient[];
  createdAt: Date;
  updatedAt: Date;
}