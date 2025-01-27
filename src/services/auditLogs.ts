import http from '../config/http';
import { IAuditLog } from '../models/models.index';
import { handleError } from './handler-error';

export default class AuditLogService {
  public async getAuditLog(id: string): Promise<IAuditLog> {
    try {
      const response = await http.get<IAuditLog>(`/auditLogs/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async getAllAuditLogs(): Promise<IAuditLog[]> {
    try {
      const response = await http.get<IAuditLog[]>('/auditLogs');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
