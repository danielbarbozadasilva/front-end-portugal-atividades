import http from '../config/http';
import { IActivity } from '../models/models.index';
import { handleError } from './handler-error';

export default class ActivityService {
  public async getActivity(id: string): Promise<IActivity> {
    try {
      const response = await http.get<IActivity>(`/activities/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllActivities(): Promise<IActivity[]> {
    try {
      const response = await http.get<IActivity[]>('/activities');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createActivity(activity: IActivity): Promise<IActivity> {
    try {
      const response = await http.post<IActivity>('/activities', activity);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateActivity(id: string, activity: IActivity, config: any): Promise<IActivity> {
    try {
      const response = await http.put<IActivity>(`/activities/${id}`, activity, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteActivity(id: string): Promise<void> {
    try {
      await http.delete(`/activities/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
