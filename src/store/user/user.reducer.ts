import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import UserAction from '../user/user.action'
import { IUser } from '../../models/models.index'

export class UserSlice {
  private userActionInstance: UserAction
  public slice: Slice

  constructor() {
    this.userActionInstance = new UserAction()

    this.slice = createSlice({
      name: 'user',
      initialState: {
        loading: false,
        all: [] as IUser[],
        userid: {} as IUser,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.userActionInstance.listAllUsersAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.userActionInstance.listAllUsersAction.fulfilled,
            (state, action: PayloadAction<IUser[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.userActionInstance.listAllUsersAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.userActionInstance.listUserByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.userActionInstance.listUserByIdAction.fulfilled,
            (state, action: PayloadAction<IUser>) => {
              state.loading = false
              state.userid = action.payload
            }
          )
          .addCase(this.userActionInstance.listUserByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.userActionInstance.updateUserAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.userActionInstance.updateUserAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.userActionInstance.updateUserAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.userActionInstance.removeUserAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.userActionInstance.removeUserAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.userActionInstance.removeUserAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getUserActions() {
    return this.userActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const userSliceInstance = new UserSlice()

 export const { setError } = userSliceInstance.getActions()

export const {
  listAllUsersAction,
  listUserByIdAction,
  updateUserAction,
  removeUserAction
} = userSliceInstance.getUserActions()

export default userSliceInstance.getReducer()
