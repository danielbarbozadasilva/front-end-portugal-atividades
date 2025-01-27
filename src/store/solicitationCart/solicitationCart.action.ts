import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ISolicitationCartItem } from '../../models/models.solicitationCartItem'
import SolicitationCartService from '../../services/solicitationsCartItem'

export default class SolicitationCartItemAction {
  private solicitationCartService: SolicitationCartService

  constructor() {
    this.solicitationCartService = new SolicitationCartService()
  }

  public listAllSolicitationsCartItemAction = createAsyncThunk(
    'solicitationCartItem/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: ISolicitationCartItem[] =
          await this.solicitationCartService.getAllSolicitationsCartItem()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listSolicitationCartItemByIdAction = createAsyncThunk(
    'solicitationCartItem/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: ISolicitationCartItem =
          await this.solicitationCartService.getSolicitationCartItem(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateSolicitationCartItemAction = createAsyncThunk(
    'solicitationCartItem/update',
    async (
      data: { id: string; solicitation: Partial<ISolicitationCartItem> },
      { rejectWithValue }
    ) => {
      try {
        // Exemplo de config para caso precise de multipart/form-data
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        await this.solicitationCartService.updateSolicitationCartItem(
          data.id,
          data.solicitation,
          config
        )
        toast.success('Item de solicitação atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeSolicitationCartItemAction = createAsyncThunk(
    'solicitationCartItem/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.solicitationCartService.deleteSolicitationCartItem(id)
        toast.success('Item de solicitação removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
