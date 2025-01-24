import http from '../config/http';
import { IAuth } from '../models/models.index';
import { handleError } from './handler-error';

export default class AuthService {
  public static async login(credentials: { email: string; password: string }): Promise<IAuth> {
    try {
      const response = await http.post<IAuth>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async logout(): Promise<void> {
    try {
      await http.post('/auth/logout');
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getProfile(): Promise<IAuth> {
    try {
      const response = await http.get<IAuth>('/auth/profile');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
