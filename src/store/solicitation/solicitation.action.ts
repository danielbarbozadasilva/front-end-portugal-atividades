import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ISolicitation } from '../../models/models.index'
import SolicitationService from '../../services/solicitations'

export default class SolicitationAction {
  private solicitationService: SolicitationService;

  constructor() {
    this.solicitationService = new SolicitationService()
  }

  public listAllSolicitationsAction = createAsyncThunk(
    'solicitation/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: ISolicitation[] = await this.solicitationService.getAllSolicitations();
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listSolicitationByIdAction = createAsyncThunk(
    'solicitation/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: ISolicitation = await this.solicitationService.getSolicitation(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateSolicitationAction = createAsyncThunk(
    'solicitation/update',
    async (
      data: { id: string; solicitation: ISolicitation, config?: any },
      { rejectWithValue }
    ) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        await this.solicitationService.updateSolicitation(data.id, data.solicitation, config)
        toast.success('Item de solicitação atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeSolicitationAction = createAsyncThunk(
    'solicitation/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.solicitationService.deleteSolicitation(id)
        toast.success('Item de solicitação removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
