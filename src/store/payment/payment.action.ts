import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IPayment } from '../../models/models.index'
import PaymentService from '../../services/payments'

export default class PaymentAction {
  private paymentService: PaymentService

  constructor() {
    this.paymentService = new PaymentService()
  }

  public listAllPaymentsAction = createAsyncThunk(
    'payment/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IPayment[] = await this.paymentService.getAllPayments()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listPaymentByIdAction = createAsyncThunk(
    'payment/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IPayment = await this.paymentService.getPayment(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updatePaymentAction = createAsyncThunk(
    'payment/update',
    async (payment: { id: string; data: IPayment }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        await this.paymentService.updatePayment(payment.id, payment.data, config)
        toast.success('Pagamento atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removePaymentAction = createAsyncThunk(
    'payment/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.paymentService.deletePayment(id)
        toast.success('Pagamento removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
