import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import SolicitationCartItemAction from './solicitationCart.action'
import { ISolicitationCartItem } from '../../models/models.solicitationCartItem'

export class SolicitationCartItemSlice {
  private solicitationCartItemActionInstance: SolicitationCartItemAction
  public slice: Slice

  constructor() {
    this.solicitationCartItemActionInstance = new SolicitationCartItemAction()

    this.slice = createSlice({
      name: 'solicitationCartItem',
      initialState: {
        loading: false,
        all: [] as ISolicitationCartItem[],
        solicitationCartItemId: {} as ISolicitationCartItem,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {

        builder
          .addCase(
            this.solicitationCartItemActionInstance.listAllSolicitationsCartItemAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.listAllSolicitationsCartItemAction.fulfilled,
            (state, action: PayloadAction<ISolicitationCartItem[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.listAllSolicitationsCartItemAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.solicitationCartItemActionInstance.listSolicitationCartItemByIdAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.listSolicitationCartItemByIdAction.fulfilled,
            (state, action: PayloadAction<ISolicitationCartItem>) => {
              state.loading = false
              state.solicitationCartItemId = action.payload
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.listSolicitationCartItemByIdAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.solicitationCartItemActionInstance.updateSolicitationCartItemAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.updateSolicitationCartItemAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.updateSolicitationCartItemAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.solicitationCartItemActionInstance.removeSolicitationCartItemAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.removeSolicitationCartItemAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.solicitationCartItemActionInstance.removeSolicitationCartItemAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getSolicitationCartItemActions() {
    return this.solicitationCartItemActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const solicitationCartItemSliceInstance = new SolicitationCartItemSlice()

export const { setError } = solicitationCartItemSliceInstance.getActions()

export const {
  listAllSolicitationsCartItemAction,
  listSolicitationCartItemByIdAction,
  updateSolicitationCartItemAction,
  removeSolicitationCartItemAction
} = solicitationCartItemSliceInstance.getSolicitationCartItemActions()

export default solicitationCartItemSliceInstance.getReducer()
