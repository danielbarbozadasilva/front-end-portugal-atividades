import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import OrderAction from './order.action'
import { IOrder } from '../../models/models.index'

export class OrderSlice {
  private orderActionInstance: OrderAction
  public slice: Slice

  constructor() {
    this.orderActionInstance = new OrderAction()

    this.slice = createSlice({
      name: 'order',
      initialState: {
        loading: false,
        all: [] as IOrder[],
        orderid: {} as IOrder,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.orderActionInstance.listAllOrdersAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.orderActionInstance.listAllOrdersAction.fulfilled,
            (state, action: PayloadAction<IOrder[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.orderActionInstance.listAllOrdersAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.orderActionInstance.listOrderByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.orderActionInstance.listOrderByIdAction.fulfilled,
            (state, action: PayloadAction<IOrder>) => {
              state.loading = false
              state.orderid = action.payload
            }
          )
          .addCase(this.orderActionInstance.listOrderByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.orderActionInstance.updateOrderAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.orderActionInstance.updateOrderAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.orderActionInstance.updateOrderAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.orderActionInstance.removeOrderAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.orderActionInstance.removeOrderAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.orderActionInstance.removeOrderAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getOrderActions() {
    return this.orderActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const orderSliceInstance = new OrderSlice()

export const { setError } = orderSliceInstance.getActions()

export const {
  listAllOrdersAction,
  listOrderByIdAction,
  updateOrderAction,
  removeOrderAction
} = orderSliceInstance.getOrderActions()

export default orderSliceInstance.getReducer()
