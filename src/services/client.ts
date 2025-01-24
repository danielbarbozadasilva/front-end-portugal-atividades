import http from '../config/http';
import { IClient } from '../models/models.index';
import { handleError } from './handler-error';

export default class ClientService {
 
  public static async getClient(id: string): Promise<IClient> {
    try {
      const response = await http.get<IClient>(`/clients/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllClients(): Promise<IClient[]> {
    try {
      const response = await http.get<IClient[]>('/clients');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createClient(client: IClient): Promise<IClient> {
    try {
      const response = await http.post<IClient>('/clients', client);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateClient(id: string, client: IClient): Promise<IClient> {
    try {
      const response = await http.put<IClient>(`/clients/${id}`, client);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteClient(id: string): Promise<void> {
    try {
      await http.delete(`/clients/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
