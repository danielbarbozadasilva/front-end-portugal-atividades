import http from '../config/http';
import { IAgent } from '../models/models.index';
import { handleError } from './handler-error';

// Interface para respostas padronizadas do backend
interface IResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export default class AgentService {
  public async getAgent(id: string): Promise<IAgent> {
    try {
      // Backend retorna um objeto IResponse<IAgent>
      const response = await http.get<IResponse<IAgent>>(`/agents/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllAgents(): Promise<IAgent[]> {
    try {
      // Backend retorna IResponse<IAgent[]>
      const response = await http.get<IResponse<IAgent[]>>('/agents');
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createAgent(agent: IAgent, config?: any): Promise<IAgent> {
    try {
      const response = await http.post<IResponse<IAgent>>('/agents', agent, config);
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateAgent(id: string, agent: IAgent, config?: any): Promise<IAgent> {
    try {
      const response = await http.put<IResponse<IAgent>>(`/agents/${id}`, agent, config);
      return response.data.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteAgent(id: string, config?: any): Promise<void> {
    try {
      // Agora aceitamos config para enviar cabeçalhos de auth
      await http.delete(`/agents/${id}`, config);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
