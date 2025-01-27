import http from '../../config/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import AuthStorage from '../../config/auth'
import AuthService from '../../services/auth'
import { IAuth } from '../../models/models.index'
import { navigate } from '../../hooks/navigation-context'

export default class AuthAction {
  private authStorage: AuthStorage
  private authService: AuthService

  constructor() {
    this.authStorage = new AuthStorage()
    this.authService = new AuthService()
  }

  public signInAction = createAsyncThunk('auth/login', 
    async (data: { email: string, password: string }): Promise<any> => {
      try {
        const result:any = await this.authService.loginService({
          email: data.email,
          password: data.password
        })
        if (result.success) {
          this.authStorage.saveAuth(result.data)

          http.defaults.headers.token = result.data.resultGenerateToken.token
          const permission: boolean = result.data.resultUserMapper.permissions.includes('administrator')
          if (permission) {
            navigate('/dashboard/users')
          } else {
            navigate('/')
          }

          toast.success(`${result.message} ${result?.data?.resultUserMapper.username}`)
          return result
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erro ao fazer login')
      }
    }
  )

  public logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        this.authService.logoutService()
        this.authStorage.removeToken()
        navigate('/signin')        
        return { success: true }
      } catch (error: any) {
        toast.error('Erro ao fazer logout')
        return rejectWithValue(error?.message ?? 'Erro genérico')
      }
    }
  )
}