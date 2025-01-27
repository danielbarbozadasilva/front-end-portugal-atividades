import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import GroupAction from './group.action'
import { IGroup } from '../../models/models.index'

export class GroupSlice {
  private groupActionInstance: GroupAction
  public slice: Slice

  constructor() {
    this.groupActionInstance = new GroupAction()

    this.slice = createSlice({
      name: 'group',
      initialState: {
        loading: false,
        all: [] as IGroup[],
        groupid: {} as IGroup,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.groupActionInstance.listAllGroupsAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.groupActionInstance.listAllGroupsAction.fulfilled,
            (state, action: PayloadAction<IGroup[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.groupActionInstance.listAllGroupsAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.groupActionInstance.listGroupByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.groupActionInstance.listGroupByIdAction.fulfilled,
            (state, action: PayloadAction<IGroup>) => {
              state.loading = false
              state.groupid = action.payload
            }
          )
          .addCase(this.groupActionInstance.listGroupByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.groupActionInstance.updateGroupAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.groupActionInstance.updateGroupAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.groupActionInstance.updateGroupAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.groupActionInstance.removeGroupAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.groupActionInstance.removeGroupAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.groupActionInstance.removeGroupAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getGroupActions() {
    return this.groupActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const groupSliceInstance = new GroupSlice()

export const { setError } = groupSliceInstance.getActions()

export const {
  listAllGroupsAction,
  listGroupByIdAction,
  updateGroupAction,
  removeGroupAction
} = groupSliceInstance.getGroupActions()

export default groupSliceInstance.getReducer()
