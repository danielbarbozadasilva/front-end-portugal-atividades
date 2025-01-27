import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IClient } from '../../models/models.index'
import ClientService from '../../services/client'

export default class ClientAction {
  public listAllClientsAction = createAsyncThunk(
    'client/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IClient[] = await ClientService.getAllClients()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listClientByIdAction = createAsyncThunk(
    'client/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IClient = await ClientService.getClient(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public createClientAction = createAsyncThunk(
    'client/create',
    async (client: { id: string; data: IClient }, { rejectWithValue }) => {
      try {
        await ClientService.createClient(client.data as IClient)
        toast.success('Cliente atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public updateClientAction = createAsyncThunk(
    'client/update',
    async (client: { id: string; data: IClient }, { rejectWithValue }) => {
      try {
        await ClientService.updateClient(client.id, client.data as IClient)
        toast.success('Cliente atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeClientAction = createAsyncThunk(
    'client/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await ClientService.deleteClient(id)
        toast.success('Cliente removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
