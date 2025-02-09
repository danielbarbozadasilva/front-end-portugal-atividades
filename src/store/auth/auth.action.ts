import http from '../../config/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import AuthStorage from '../../config/auth'
import AuthService from '../../services/auth'

interface IAuthResponse {
  data: IDataModel
  message: string
  status: number
  success: boolean
}
interface IDataModel {
  token: string
  name: string
  email: string
  username: string
  permissions: string
}

export default class AuthAction {
  private authStorage: AuthStorage
  private authService: AuthService

  constructor() {
    this.authStorage = new AuthStorage()
    this.authService = new AuthService()
  }

  public signInAction = createAsyncThunk(
    'auth/login',
    async (data: {
      email: string
      password: string
    }): Promise<any> => {
      try {
        const resultAuth: IAuthResponse | undefined =
          await this.authService.loginService({
            email: data.email,
            password: data.password
          })

        if (resultAuth?.status === 200) {
          this.authStorage.saveAuth(resultAuth.data)
          http.defaults.headers.token = resultAuth.data.token
          return resultAuth
        } else {
          toast.error('Usuário ou senha inválidos')
          return false
        }
      } catch (error: any) {
        toast.error('Erro ao fazer login')
        return false
      }
    }
  )

  public logoutAction = createAsyncThunk(
    'auth/logout',
    async (id: string): Promise<any> => {
      try {
        await this.authService.logoutService({ _id: id })
        this.authStorage.removeToken()
        return { success: true }
      } catch (error: any) {
        toast.error('Erro ao fazer login')
        return false
      }
    }
  )
}
