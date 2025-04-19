import http from '../config/http';
import { IClient } from '../models/models.index';
import { handleError } from './handler-error';

interface IApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export default class ClientService {
  public static async getClient(id: string): Promise<IClient> {
    try {
      const response = await http.get<IApiResponse<IClient>>(`/clients/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllClients(): Promise<IClient[]> {
    try {
      const response = await http.get<IApiResponse<IClient[]>>('/clients');
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createClient(client: IClient): Promise<IClient> {
    try {
      const response = await http.post<IApiResponse<IClient>>('/clients', client);
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateClient(id: string, client: IClient): Promise<IClient> {
    try {
      const response = await http.put<IApiResponse<IClient>>(`/clients/${id}`, client);
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteClient(id: string): Promise<void> {
    try {
      await http.delete<IApiResponse<null>>(`/clients/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}