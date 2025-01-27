import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IPaymentMethod } from '../../models/models.index'
import PaymentMethodService from '../../services/paymentMethods'

export default class PaymentMethodAction {
  private paymentMethodService: PaymentMethodService

  constructor() {
    this.paymentMethodService = new PaymentMethodService()
  }

  public listAllPaymentMethodsAction = createAsyncThunk(
    'paymentMethod/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IPaymentMethod[] = await this.paymentMethodService.getAllPaymentMethods()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listPaymentMethodByIdAction = createAsyncThunk(
    'paymentMethod/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IPaymentMethod = await this.paymentMethodService.getPaymentMethod(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updatePaymentMethodAction = createAsyncThunk(
    'paymentMethod/update',
    async (paymentMethod: { id: string; data: Partial<IPaymentMethod> }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.paymentMethodService.updatePaymentMethod(paymentMethod.id, paymentMethod.data, config)
        toast.success('Método de pagamento atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removePaymentMethodAction = createAsyncThunk(
    'paymentMethod/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.paymentMethodService.deletePaymentMethod(id)
        toast.success('Método de pagamento removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
