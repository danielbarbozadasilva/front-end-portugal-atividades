import http from '../config/http';
import { IGroup } from '../models/models.index';
import { handleError } from './handler-error';

export default class GroupService {
  public static async getGroup(id: string): Promise<IGroup> {
    try {
      const response = await http.get<IGroup>(`/groups/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllGroups(): Promise<IGroup[]> {
    try {
      const response = await http.get<IGroup[]>('/groups');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createGroup(group: IGroup): Promise<IGroup> {
    try {
      const response = await http.post<IGroup>('/groups', group);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateGroup(id: string, group: IGroup): Promise<IGroup> {
    try {
      const response = await http.put<IGroup>(`/groups/${id}`, group);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteGroup(id: string): Promise<void> {
    try {
      await http.delete(`/groups/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
