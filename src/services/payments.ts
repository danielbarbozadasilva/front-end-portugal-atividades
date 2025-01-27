import http from '../config/http'
import { IPayment } from '../models/models.index'
import { handleError } from './handler-error'

export default class PaymentService {
  public async getPayment(id: string): Promise<IPayment> {
    try {
      const response = await http.get<IPayment>(`/payments/${id}`)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async getAllPayments(): Promise<IPayment[]> {
    try {
      const response = await http.get<IPayment[]>('/payments')
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async createPayment(payment: IPayment): Promise<IPayment> {
    try {
      const response = await http.post<IPayment>('/payments', payment)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async updatePayment(id: string, payment: Partial<IPayment>, config?: any): Promise<IPayment> {
    try {
      const response = await http.put<IPayment>(`/payments/${id}`, payment, config)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async deletePayment(id: string): Promise<void> {
    try {
      await http.delete(`/payments/${id}`)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}
