import http from '../config/http';
import { ISolicitation } from '../models/models.solicitation';
import { handleError } from './handler-error';

export default class SolicitationService {

  public async getSolicitation(id: string): Promise<ISolicitation> {
    try {
      const response = await http.get<ISolicitation>(`/solicitations/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllSolicitations(): Promise<ISolicitation[]> {
    try {
      const response = await http.get<ISolicitation[]>('/solicitations');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createSolicitation(solicitation: ISolicitation): Promise<ISolicitation> {
    try {
      const response = await http.post<ISolicitation>('/solicitations', solicitation);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateSolicitation(id: string, solicitation: ISolicitation, config: any): Promise<ISolicitation> {
    try {
      const response = await http.put<ISolicitation>(`/solicitations/${id}`, solicitation, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteSolicitation(id: string): Promise<void> {
    try {
      await http.delete(`/solicitations/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}