import http from '../config/http';
import { ISolicitation } from '../models/models.solicitation';
import { handleError } from './handler-error';

export default class SolicitationService {

  public static async getSolicitation(id: string): Promise<ISolicitation> {
    try {
      const response = await http.get<ISolicitation>(`/solicitations/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllSolicitations(): Promise<ISolicitation[]> {
    try {
      const response = await http.get<ISolicitation[]>('/solicitations');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createSolicitation(solicitation: ISolicitation): Promise<ISolicitation> {
    try {
      const response = await http.post<ISolicitation>('/solicitations', solicitation);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateSolicitation(id: string, solicitation: ISolicitation): Promise<ISolicitation> {
    try {
      const response = await http.put<ISolicitation>(`/solicitations/${id}`, solicitation);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteSolicitation(id: string): Promise<void> {
    try {
      await http.delete(`/solicitations/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}