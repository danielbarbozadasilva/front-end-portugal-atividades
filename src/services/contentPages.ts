import http from '../config/http';
import { IContentPage } from '../models/models.index';
import { handleError } from './handler-error';

export default class ContentPageService {
  public async getContentPage(id: string): Promise<IContentPage> {
    try {
      const response = await http.get<IContentPage>(`/activities/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllContentPages(): Promise<IContentPage[]> {
    try {
      const response = await http.get<IContentPage[]>('/activities');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async createContentPage(ContentPage: IContentPage): Promise<IContentPage> {
    try {
      const response = await http.post<IContentPage>('/activities', ContentPage);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async updateContentPage(id: string, ContentPage: IContentPage, config: any): Promise<IContentPage> {
    try {
      const response = await http.put<IContentPage>(`/activities/${id}`, ContentPage, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async deleteContentPage(id: string): Promise<void> {
    try {
      await http.delete(`/activities/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
