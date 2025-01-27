import http from '../config/http'
import { ISolicitationCartItem } from '../models/models.solicitationCartItem'
import { handleError } from './handler-error'

export default class SolicitationCartService {
  public async getSolicitationCartItem(id: string): Promise<ISolicitationCartItem> {
    try {
      const response = await http.get<ISolicitationCartItem>(`/solicitations/${id}`)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async getAllSolicitationsCartItem(): Promise<ISolicitationCartItem[]> {
    try {
      const response = await http.get<ISolicitationCartItem[]>('/solicitations')
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async createSolicitationCartItem(solicitation: ISolicitationCartItem): Promise<ISolicitationCartItem> {
    try {
      const response = await http.post<ISolicitationCartItem>('/solicitations', solicitation)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async updateSolicitationCartItem(id: string, solicitation: Partial<ISolicitationCartItem>, config?: any): Promise<ISolicitationCartItem> {
    try {
      const response = await http.put<ISolicitationCartItem>(`/solicitations/${id}`, solicitation, config)
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  public async deleteSolicitationCartItem(id: string): Promise<void> {
    try {
      await http.delete(`/solicitations/${id}`)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}
