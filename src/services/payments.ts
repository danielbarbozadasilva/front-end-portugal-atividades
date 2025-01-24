import http from '../config/http';
import { IPayment } from '../models/models.index';
import { handleError } from './handler-error';

class PaymentService {

  public static async getPayment<IPayment>(id: string): Promise<IPayment> {
    try {
      const response = await http.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async getAllPayments(): Promise<IPayment[]> {
    try {
      const response = await http.get<IPayment[]>('/payments');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async createPayment(payment: IPayment): Promise<IPayment> {
    try {
      const response = await http.post<IPayment>('/payments', payment);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async updatePayment(id: string, payment: IPayment): Promise<IPayment> {
    try {
      const response = await http.put<IPayment>(`/payments/${id}`, payment);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public static async deletePayment(id: string): Promise<void> {
    try {
      await http.delete(`/payments/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}

export default PaymentService;
