import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import PaymentMethodAction from './paymentMethod.action'
import { IPaymentMethod } from '../../models/models.index'

export class PaymentMethodSlice {
  private paymentMethodActionInstance: PaymentMethodAction
  public slice: Slice

  constructor() {
    this.paymentMethodActionInstance = new PaymentMethodAction()

    this.slice = createSlice({
      name: 'paymentMethod',
      initialState: {
        loading: false,
        all: [] as IPaymentMethod[],
        paymentmethodid: {} as IPaymentMethod,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.paymentMethodActionInstance.listAllPaymentMethodsAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.paymentMethodActionInstance.listAllPaymentMethodsAction.fulfilled,
            (state, action: PayloadAction<IPaymentMethod[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.paymentMethodActionInstance.listAllPaymentMethodsAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.paymentMethodActionInstance.listPaymentMethodByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.paymentMethodActionInstance.listPaymentMethodByIdAction.fulfilled,
            (state, action: PayloadAction<IPaymentMethod>) => {
              state.loading = false
              state.paymentmethodid = action.payload
            }
          )
          .addCase(this.paymentMethodActionInstance.listPaymentMethodByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.paymentMethodActionInstance.updatePaymentMethodAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.paymentMethodActionInstance.updatePaymentMethodAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.paymentMethodActionInstance.updatePaymentMethodAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.paymentMethodActionInstance.removePaymentMethodAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.paymentMethodActionInstance.removePaymentMethodAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.paymentMethodActionInstance.removePaymentMethodAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getPaymentMethodActions() {
    return this.paymentMethodActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const paymentMethodSliceInstance = new PaymentMethodSlice()

export const { setError } = paymentMethodSliceInstance.getActions()

export const {
  listAllPaymentMethodsAction,
  listPaymentMethodByIdAction,
  updatePaymentMethodAction,
  removePaymentMethodAction
} = paymentMethodSliceInstance.getPaymentMethodActions()

export default paymentMethodSliceInstance.getReducer()
