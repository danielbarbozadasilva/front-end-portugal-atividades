import http from '../config/http'
import { IOrder } from '../models/models.index'
import { handleError } from './handler-error'

export default class OrderService {
  public async getOrder(id: string): Promise<IOrder> {
    try {
      const response = await http.get<IOrder>(`/orders/${id}`)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async getAllOrders(): Promise<IOrder[]> {
    try {
      const response = await http.get<IOrder[]>('/orders')
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async createOrder(order: IOrder): Promise<IOrder> {
    try {
      const response = await http.post<IOrder>('/orders', order)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async updateOrder(id: string, order: Partial<IOrder>, config?: any): Promise<IOrder> {
    try {
      const response = await http.put<IOrder>(`/orders/${id}`, order, config)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async deleteOrder(id: string): Promise<void> {
    try {
      await http.delete(`/orders/${id}`)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}
