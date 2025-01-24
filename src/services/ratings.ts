import http from '../config/http';
import { IRating } from '../models/models.index';
import { handleError } from './handler-error';

export default class RatingService {

  public static async getRating(id: string): Promise<IRating> {
    try {
      const response = await http.get<IRating>(`/ratings/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllRatings(): Promise<IRating[]> {
    try {
      const response = await http.get<IRating[]>('/ratings');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createRating(rating: IRating): Promise<IRating> {
    try {
      const response = await http.post<IRating>('/ratings', rating);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateRating(id: string, rating: IRating): Promise<IRating> {
    try {
      const response = await http.put<IRating>(`/ratings/${id}`, rating);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteRating(id: string): Promise<void> {
    try {
      await http.delete(`/ratings/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
