import http from '../config/http';
import { IOrder } from '../models/models.index';
import { handleError } from './handler-error';

export default class OrderService {

  public static async getOrder(id: string): Promise<IOrder> {
    try {
      const response = await http.get<IOrder>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllOrders(): Promise<IOrder[]> {
    try {
      const response = await http.get<IOrder[]>('/orders');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createOrder(order: IOrder): Promise<IOrder> {
    try {
      const response = await http.post<IOrder>('/orders', order);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updateOrder(id: string, order: IOrder): Promise<IOrder> {
    try {
      const response = await http.put<IOrder>(`/orders/${id}`, order);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deleteOrder(id: string): Promise<void> {
    try {
      await http.delete(`/orders/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  } 
}