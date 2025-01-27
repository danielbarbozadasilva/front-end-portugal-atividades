import { createSlice } from '@reduxjs/toolkit'
import AuthStorage from '../../config/auth'
import AuthAction from './auth.action'

type UserState = {
  loading: boolean
  token: string
  user: any
  userid: string
  error: string
  registered: boolean
}

export class AuthSlice {
  private authActionInstance: AuthAction
  private authStorage: AuthStorage
  public slice

  constructor() {
    this.authActionInstance = new AuthAction()
    this.authStorage = new AuthStorage()

    this.slice = createSlice({
      name: 'auth',
      initialState: {
        loading: false,
        token: '',
        user: this.authStorage.getUser(),
        userid: '',
        error: '',
        registered: false
      } as UserState,
      reducers: {
        logoutUser: (state) => {
          this.authStorage.removeToken()
          state.token = ''
          state.user = false
          state.error = ''
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(
            this.authActionInstance.signInAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.authActionInstance.signInAction.fulfilled,
            (state, action) => {
              state.loading = false;
              state.registered = true;
              state.token = action.payload?.data?.resultGenerateToken?.token || '';
              state.user = action.payload?.data?.resultUserMapper;
            }
          )
          .addCase(
            this.authActionInstance.signInAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error?.message || 'Failed to fetch'
            }
          )

        builder
          .addCase(
            this.authActionInstance.logoutAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.authActionInstance.logoutAction.fulfilled,
            (state) => {
              state.loading = false
              state.token = ''
              state.user = false
              state.error = ''
              this.authStorage.removeToken()
            }
          )
          .addCase(
            this.authActionInstance.logoutAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error?.message || 'Failed to logout'
            }
          )
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getAuthActions() {
    return this.authActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const authSliceInstance = new AuthSlice()

export const { logoutUser } = authSliceInstance.getActions()

export const { signInAction, logoutAction } = authSliceInstance.getAuthActions()

export default authSliceInstance.getReducer()
