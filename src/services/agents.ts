import http from '../config/http';
import { IAgent } from '../models/models.index';
import { handleError } from './handler-error';

export default class AgentService {
  public static async getAgent(id: string): Promise<IAgent> {
    try {
      const response = await http.get<IAgent>(`/agents/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllAgents(): Promise<IAgent[]> {
    try {
      const response = await http.get<IAgent[]>('/agents');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createAgent(agent: IAgent): Promise<IAgent> {
    try {
      const response = await http.post<IAgent>('/agents', agent);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateAgent(id: string, agent: IAgent): Promise<IAgent> {
    try {
      const response = await http.put<IAgent>(`/agents/${id}`, agent);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteAgent(id: string): Promise<void> {
    try {
      await http.delete(`/agents/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
