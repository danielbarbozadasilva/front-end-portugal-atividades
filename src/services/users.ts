import http from '../config/http';
import { IUser } from '../models/models.index';
import { handleError } from './handler-error';

export default class UserService {

  public async getUser(id: string): Promise<IUser> {
    try {
      const response = await http.get<IUser>(`/users/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllUsers(): Promise<IUser[]> {
    try {
      const response = await http.get<IUser[]>('/users');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createUser(user: IUser): Promise<IUser> {
    try {
      const response = await http.post<IUser>('/users', user);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateUser(id: string, user: any, config: any): Promise<IUser> {
    try {
      const response = await http.put<IUser>(`/users/${id}`, user, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await http.delete(`/users/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}