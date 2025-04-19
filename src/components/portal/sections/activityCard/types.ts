export interface IActivity {
  _id: string;
  images?: string[];
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  likes?: any[];
}

export interface ActivityCardProps {
  activity: IActivity[];
}
