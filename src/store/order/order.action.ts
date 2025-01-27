import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IOrder } from '../../models/models.index'
import OrderService from '../../services/orders'

export default class OrderAction {
  private orderService: OrderService

  constructor() {
    this.orderService = new OrderService()
  }

  public listAllOrdersAction = createAsyncThunk(
    'order/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IOrder[] = await this.orderService.getAllOrders()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listOrderByIdAction = createAsyncThunk(
    'order/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IOrder = await this.orderService.getOrder(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateOrderAction = createAsyncThunk(
    'order/update',
    async (order: { id: string; data: IOrder }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.orderService.updateOrder(order.id, order.data, config)
        toast.success('Pedido atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeOrderAction = createAsyncThunk(
    'order/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.orderService.deleteOrder(id)
        toast.success('Pedido removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
