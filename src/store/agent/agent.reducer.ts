import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import AgentAction from './agent.action'
import { IAgent } from '../../models/models.agent'

export class AgentSlice {
  private agentActionInstance: AgentAction
  public slice: Slice

  constructor() {
    this.agentActionInstance = new AgentAction()

    this.slice = createSlice({
      name: 'agent',
      initialState: {
        loading: false,
        all: [] as IAgent[],
        agentid: {} as IAgent,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.agentActionInstance.listAllAgentsAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.agentActionInstance.listAllAgentsAction.fulfilled,
            (state, action: PayloadAction<IAgent[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.agentActionInstance.listAllAgentsAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.agentActionInstance.listAgentByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.agentActionInstance.listAgentByIdAction.fulfilled,
            (state, action: PayloadAction<IAgent>) => {
              state.loading = false
              state.agentid = action.payload
            }
          )
          .addCase(this.agentActionInstance.listAgentByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.agentActionInstance.updateAgentAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.agentActionInstance.updateAgentAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.agentActionInstance.updateAgentAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.agentActionInstance.removeAgentAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.agentActionInstance.removeAgentAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.agentActionInstance.removeAgentAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getAgentActions() {
    return this.agentActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const agentSliceInstance = new AgentSlice()

export const { setError } = agentSliceInstance.getActions()

export const {
  listAllAgentsAction,
  listAgentByIdAction,
  updateAgentAction,
  removeAgentAction
} = agentSliceInstance.getAgentActions()

export default agentSliceInstance.getReducer()
