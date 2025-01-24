import http from '../config/http';
import { IUser } from '../models/models.index';
import { handleError } from './handler-error';

export default class UserService {

  public static async getUser(id: string): Promise<IUser> {
    try {
      const response = await http.get<IUser>(`/users/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllUsers(): Promise<IUser[]> {
    try {
      const response = await http.get<IUser[]>('/users');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createUser(user: IUser): Promise<IUser> {
    try {
      const response = await http.post<IUser>('/users', user);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateUser(id: string, user: IUser): Promise<IUser> {
    try {
      const response = await http.put<IUser>(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteUser(id: string): Promise<void> {
    try {
      await http.delete(`/users/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}