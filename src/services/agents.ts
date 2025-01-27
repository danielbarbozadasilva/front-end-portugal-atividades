import http from '../config/http';
import { IAgent } from '../models/models.index';
import { handleError } from './handler-error';

export default class AgentService {
  public async getAgent(id: string): Promise<IAgent> {
    try {
      const response = await http.get<IAgent>(`/agents/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllAgents(): Promise<IAgent[]> {
    try {
      const response = await http.get<IAgent[]>('/agents');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createAgent(agent: IAgent): Promise<IAgent> {
    try {
      const response = await http.post<IAgent>('/agents', agent);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateAgent(id: string, agent: IAgent, config: any): Promise<IAgent> {
    try {
      const response = await http.put<IAgent>(`/agents/${id}`, agent, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteAgent(id: string): Promise<void> {
    try {
      await http.delete(`/agents/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
