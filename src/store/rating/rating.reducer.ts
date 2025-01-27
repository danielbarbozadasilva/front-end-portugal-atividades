import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import RatingMethodAction from './rating.action'
import { IRating } from '../../models/models.index'

export class RatingMethodSlice {
  private ratingMethodActionInstance: RatingMethodAction
  public slice: Slice

  constructor() {
    this.ratingMethodActionInstance = new RatingMethodAction()

    this.slice = createSlice({
      name: 'rating',
      initialState: {
        loading: false,
        all: [] as IRating[],
        ratingid: {} as IRating,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.ratingMethodActionInstance.findByIdRatingAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.ratingMethodActionInstance.findByIdRatingAction.fulfilled,
            (state, action) => {
              state.loading = false
              state.ratingid = action.payload
            }
          )
          .addCase(
            this.ratingMethodActionInstance.findByIdRatingAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(this.ratingMethodActionInstance.createRatingAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.ratingMethodActionInstance.createRatingAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.ratingMethodActionInstance.createRatingAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(this.ratingMethodActionInstance.updateRatingAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.ratingMethodActionInstance.updateRatingAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.ratingMethodActionInstance.updateRatingAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(this.ratingMethodActionInstance.deleteRatingAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.ratingMethodActionInstance.deleteRatingAction.fulfilled,
            (state) => {
              state.loading = false
            }
          )
          .addCase(
            this.ratingMethodActionInstance.deleteRatingAction.rejected,
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

  public getRatingMethodActions() {
    return this.ratingMethodActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const RatingMethodSliceInstance = new RatingMethodSlice()

export const { setError } = RatingMethodSliceInstance.getActions()

export const {
  findByIdRatingAction,
  createRatingAction,
  updateRatingAction,
  deleteRatingAction
} = RatingMethodSliceInstance.getRatingMethodActions()

export default RatingMethodSliceInstance.getReducer()
