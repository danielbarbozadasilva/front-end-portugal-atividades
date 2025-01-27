import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import SolicitationAction from './solicitation.action'
import { ISolicitation } from '../../models/models.index'

export class SolicitationItemSlice {
  private solicitationActionInstance: SolicitationAction
  public slice: Slice

  constructor() {
    this.solicitationActionInstance = new SolicitationAction()

    this.slice = createSlice({
      name: 'solicitationItem',
      initialState: {
        loading: false,
        all: [] as ISolicitation[],
        solicitationItemId: {} as ISolicitation,
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
            this.solicitationActionInstance.listAllSolicitationsAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationActionInstance.listAllSolicitationsAction.fulfilled,
            (state, action: PayloadAction<ISolicitation[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(
            this.solicitationActionInstance.listAllSolicitationsAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.solicitationActionInstance.listSolicitationByIdAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationActionInstance.listSolicitationByIdAction.fulfilled,
            (state, action: PayloadAction<ISolicitation>) => {
              state.loading = false
              state.solicitationItemId = action.payload
            }
          )
          .addCase(
            this.solicitationActionInstance.listSolicitationByIdAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.solicitationActionInstance.updateSolicitationAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationActionInstance.updateSolicitationAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.solicitationActionInstance.updateSolicitationAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.solicitationActionInstance.removeSolicitationAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.solicitationActionInstance.removeSolicitationAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.solicitationActionInstance.removeSolicitationAction.rejected,
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

  public getSolicitationActions() {
    return this.solicitationActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const solicitationItemSliceInstance = new SolicitationItemSlice()

export const { setError } = solicitationItemSliceInstance.getActions()

export const {
  listAllSolicitationsAction,
  listSolicitationByIdAction,
  updateSolicitationAction,
  removeSolicitationAction
} = solicitationItemSliceInstance.getSolicitationActions()

export default solicitationItemSliceInstance.getReducer()
