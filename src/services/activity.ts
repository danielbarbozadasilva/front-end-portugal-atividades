import http from '../config/http';
import { IActivityFilters } from '../models/models.activity';
import { IActivity } from '../models/models.index';
import { handleError } from './handler-error';

export default class ActivityService {
  public async getActivity(id: string): Promise<IActivity> {
    try {
      const response = await http.get<IActivity>(`/activity/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllActivities(filters: any): Promise<any> {
    try {
      const response = await http.get<IActivity[]>('/activity', { params: filters });
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createActivity(activity: IActivity): Promise<IActivity> {
    try {
      const response = await http.post<IActivity>('/activity', activity);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateActivity(id: string, activity: IActivity, config: any): Promise<IActivity> {
    try {
      const response = await http.put<IActivity>(`/activity/${id}`, activity, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteActivity(id: string): Promise<void> {
    try {
      await http.delete(`/activity/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
