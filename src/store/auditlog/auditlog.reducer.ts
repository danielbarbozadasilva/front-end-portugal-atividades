import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import AuditLogAction from './auditlog.action'
import { IAuditLog } from '../../models/models.auditLog'

export class AuditLogSlice {
  private auditLogActionInstance: AuditLogAction
  public slice: Slice

  constructor() {
    this.auditLogActionInstance = new AuditLogAction()

    this.slice = createSlice({
      name: 'auditLog',
      initialState: {
        loading: false,
        all: [] as IAuditLog[],
        auditLogId: {} as IAuditLog,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.auditLogActionInstance.listAllAuditLogsAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.auditLogActionInstance.listAllAuditLogsAction.fulfilled,
            (state, action: PayloadAction<IAuditLog[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.auditLogActionInstance.listAllAuditLogsAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.auditLogActionInstance.listAuditLogByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.auditLogActionInstance.listAuditLogByIdAction.fulfilled,
            (state, action: PayloadAction<IAuditLog>) => {
              state.loading = false
              state.auditLogId = action.payload
            }
          )
          .addCase(this.auditLogActionInstance.listAuditLogByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getAuditLogActions() {
    return this.auditLogActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const auditLogSliceInstance = new AuditLogSlice()

export const { setError } = auditLogSliceInstance.getActions()

export const {
  listAllAuditLogsAction,
  listAuditLogByIdAction
} = auditLogSliceInstance.getAuditLogActions()

export default auditLogSliceInstance.getReducer()
