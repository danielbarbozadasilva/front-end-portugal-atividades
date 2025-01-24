export interface IUser {
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