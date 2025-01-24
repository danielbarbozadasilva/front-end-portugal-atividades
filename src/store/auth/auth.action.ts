import http from '../../config/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { removeToken, saveAuth } from '../../config/auth'
import { login, logout } from '../../services/auth'
import { IAuth } from '../../models/models.index'
import { navigate } from '../../hooks/index';

export const signInAction = createAsyncThunk(
  'auth/signin',
  async (data: any) : Promise<IAuth | undefined> => {
    try {
      const result = await login({ email: data.email, password: data.password })
      if (result?.data) {
        const { data } = result.data
        saveAuth(data)
        http.defaults.headers.token = data.token
      
        if (data.data.permissions.includes('admin')) {
          navigate.apply('/dashboard/users')
        } else {
          navigate.apply('/')
        }
        toast.success(`${result.data.message} ${data.data.username}`)
        return data
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const signUpAction = createAsyncThunk(
  'auth/signup',
  async (data: ISignUp) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const result = await registerService(data, config)
      toast.success(`${result.data.message}`)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const logoutAction = async() => {
  await logout()
  removeToken()
}
