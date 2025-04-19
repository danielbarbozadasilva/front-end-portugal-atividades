import { IActivity } from '../../../../models/models.activity'

export interface ActivityCardProps {
  activity: IActivity
}

export interface IPropsData {
  _id: string
  images: string[]
  name: string
  shortDescription: string
  location: string;
  reverse: boolean
  startDate: string
  endDate: string
  likes: string[]
  price: number;     
  featured: boolean;  
}