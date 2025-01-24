export interface IAuditLog {
  _id: string;
  event: string;
  user: string | IUser;
  data: any;
  createdAt: Date;
}

interface IUser {
  hash: string;
  salt: string;
  name: string;
  email: string;
  username: string;
  permissions: string[];
  recovery?: {
    token?: string;
    date?: Date;
  };
  refreshToken?: {
    data: string;
    expiresIn: number;
    iv: string;
  };
  createdAt: Date;
  updatedAt: Date;
  wasNew?: any;
}