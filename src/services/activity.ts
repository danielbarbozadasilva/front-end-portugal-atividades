import http from '../config/http';
import { IActivity } from '../models/models.index';
import { handleError } from './handler-error';

export default class ActivityService {
  public static async getActivity(id: string): Promise<IActivity> {
    try {
      const response = await http.get<IActivity>(`/activities/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllActivities(): Promise<IActivity[]> {
    try {
      const response = await http.get<IActivity[]>('/activities');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createActivity(activity: IActivity): Promise<IActivity> {
    try {
      const response = await http.post<IActivity>('/activities', activity);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateActivity(id: string, activity: IActivity): Promise<IActivity> {
    try {
      const response = await http.put<IActivity>(`/activities/${id}`, activity);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteActivity(id: string): Promise<void> {
    try {
      await http.delete(`/activities/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
