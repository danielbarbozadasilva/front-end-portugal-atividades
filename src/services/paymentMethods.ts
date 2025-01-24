import http from '../config/http';
import { IPaymentMethod } from '../models/models.index';
import { handleError } from './handler-error';

export default class PaymentMethodService {
  public static async getPaymentMethod(id: string): Promise<IPaymentMethod> {
    try {
      const response = await http.get<IPaymentMethod>(`/paymentMethods/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllPaymentMethods(): Promise<IPaymentMethod[]> {
    try {
      const response = await http.get<IPaymentMethod[]>('/paymentMethods');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createPaymentMethod(paymentMethod: IPaymentMethod): Promise<IPaymentMethod> {
    try {
      const response = await http.post<IPaymentMethod>('/paymentMethods', paymentMethod);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updatePaymentMethod(id: string, paymentMethod: IPaymentMethod): Promise<IPaymentMethod> {
    try {
      const response = await http.put<IPaymentMethod>(`/paymentMethods/${id}`, paymentMethod);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deletePaymentMethod(id: string): Promise<void> {
    try {
      await http.delete(`/paymentMethods/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}