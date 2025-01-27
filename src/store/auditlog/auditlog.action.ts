import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IAuditLog } from '../../models/models.auditLog'
import AuditLogService from '../../services/auditLogs'

export default class AuditLogAction {
  private auditLogService: AuditLogService

  constructor() {
    this.auditLogService = new AuditLogService()
  }

  public listAllAuditLogsAction = createAsyncThunk(
    'auditLog/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IAuditLog[] = await this.auditLogService.getAllAuditLogs()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listAuditLogByIdAction = createAsyncThunk(
    'auditLog/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IAuditLog = await this.auditLogService.getAuditLog(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
