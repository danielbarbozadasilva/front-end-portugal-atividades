import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import PaymentAction from './payment.action'
import { IPayment } from '../../models/models.index'

export class PaymentSlice {
  private paymentActionInstance: PaymentAction
  public slice: Slice

  constructor() {
    this.paymentActionInstance = new PaymentAction()

    this.slice = createSlice({
      name: 'payment',
      initialState: {
        loading: false,
        all: [] as IPayment[],
        paymentid: {} as IPayment,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        // listAllPaymentsAction
        builder
          .addCase(this.paymentActionInstance.listAllPaymentsAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.paymentActionInstance.listAllPaymentsAction.fulfilled,
            (state, action: PayloadAction<IPayment[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.paymentActionInstance.listAllPaymentsAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        // listPaymentByIdAction
        builder
          .addCase(this.paymentActionInstance.listPaymentByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.paymentActionInstance.listPaymentByIdAction.fulfilled,
            (state, action: PayloadAction<IPayment>) => {
              state.loading = false
              state.paymentid = action.payload
            }
          )
          .addCase(this.paymentActionInstance.listPaymentByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        // updatePaymentAction
        builder
          .addCase(this.paymentActionInstance.updatePaymentAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.paymentActionInstance.updatePaymentAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.paymentActionInstance.updatePaymentAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        // removePaymentAction
        builder
          .addCase(this.paymentActionInstance.removePaymentAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.paymentActionInstance.removePaymentAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.paymentActionInstance.removePaymentAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getPaymentActions() {
    return this.paymentActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const paymentSliceInstance = new PaymentSlice()

export const { setError } = paymentSliceInstance.getActions()

export const {
  listAllPaymentsAction,
  listPaymentByIdAction,
  updatePaymentAction,
  removePaymentAction
} = paymentSliceInstance.getPaymentActions()

export default paymentSliceInstance.getReducer()
