import { IUser } from "./models.user";

export interface IAuditLog {
  _id: string;
  event: string;
  user: IUser[];
  data: any;
  createdAt: Date;
}