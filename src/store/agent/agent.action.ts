import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IAgent } from '../../models/models.agent'
import AgentService from '../../services/agents'

export default class AgentAction {
  private agentService: AgentService

  constructor() {
    this.agentService = new AgentService()
  }

  public listAllAgentsAction = createAsyncThunk(
    'agent/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IAgent[] = await this.agentService.getAllAgents()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listAgentByIdAction = createAsyncThunk(
    'agent/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IAgent = await this.agentService.getAgent(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
  public createAgentAction = createAsyncThunk(
    'agent/create',
    async (agent: { data: IAgent }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.agentService.createAgent(agent.data, config)
        toast.success('Agente criado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public updateAgentAction = createAsyncThunk(
    'agent/update',
    async (agent: { id: string; data: IAgent }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.agentService.updateAgent(agent.id, agent.data, config)
        toast.success('Agente atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeAgentAction = createAsyncThunk(
    'agent/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.agentService.deleteAgent(id)
        toast.success('Agente removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
