import http from '../config/http'
import { toast } from 'react-toastify'
export interface IAuth {
  status: number
  success: boolean
  message: string
  data: {
    token: string
    username: string
    name: string
    email: string
    permissions: string
  }
}
export default class AuthService {
  public async loginService(credentials: { email: string, password: string }): Promise<IAuth | undefined> {
    try {
      const response = await http.post<IAuth>('/auth/login', credentials)
      return response.data
    } catch (error: any) {
      toast.error(error)
    }
  }

  public async logoutService(credentials: { _id: string }): Promise<any> {
    try {
      const response = await http.post('/auth/logout', credentials)
      return response.data    
    } catch (error: any) {
      toast.error(error)
    }
  }

  public async getProfileService(): Promise<IAuth | undefined> {
    try {
      const response = await http.get<IAuth>('/auth/profile')
      return response.data
    } catch (error: any) {
      toast.error(error)
    }
  }
}
