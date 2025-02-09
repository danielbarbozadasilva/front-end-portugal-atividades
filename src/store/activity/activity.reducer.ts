import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import ActivityAction from './activity.action'
import { IActivity } from '../../models/models.activity'

export class ActivitySlice {
  private activityActionInstance: ActivityAction
  public slice: Slice

  constructor() {
    this.activityActionInstance = new ActivityAction()

    this.slice = createSlice({
      name: 'activity',
      initialState: {
        loading: false,
        all: [] as IActivity[],
        activityid: {} as IActivity,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.activityActionInstance.listAllActivitiesAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.activityActionInstance.listAllActivitiesAction.fulfilled,
            (state, action: PayloadAction<any>) => {
              state.loading = false
              state.all = action.payload.data
            }
          )
          .addCase(this.activityActionInstance.listAllActivitiesAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.activityActionInstance.listActivityByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.activityActionInstance.listActivityByIdAction.fulfilled,
            (state, action: PayloadAction<IActivity>) => {
              state.loading = false
              state.activityid = action.payload
            }
          )
          .addCase(this.activityActionInstance.listActivityByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.activityActionInstance.updateActivityAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.activityActionInstance.updateActivityAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.activityActionInstance.updateActivityAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.activityActionInstance.removeActivityAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.activityActionInstance.removeActivityAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.activityActionInstance.removeActivityAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getActivityActions() {
    return this.activityActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const activitySliceInstance = new ActivitySlice()

export const { setError } = activitySliceInstance.getActions()

export const {
  listAllActivitiesAction,
  listActivityByIdAction,
  updateActivityAction,
  removeActivityAction
} = activitySliceInstance.getActivityActions()

export default activitySliceInstance.getReducer()
