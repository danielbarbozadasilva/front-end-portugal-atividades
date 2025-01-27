import http from '../config/http';
import { IAuth } from '../models/models.index';
import { handleError } from './handler-error';

export default class AuthService {
  public async loginService(credentials: { email: string; password: string }): Promise<IAuth> {
    try {
      const response = await http.post<IAuth>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async logoutService(): Promise<void> {
    try {
      await http.post('/auth/logout');
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getProfileService(): Promise<IAuth> {
    try {
      const response = await http.get<IAuth>('/auth/profile');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
