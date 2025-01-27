import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IGroup } from '../../models/models.index'
import GroupService from '../../services/group'

export default class GroupAction {
  private groupService: GroupService

  constructor() {
    this.groupService = new GroupService()
  }

  public listAllGroupsAction = createAsyncThunk(
    'group/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IGroup[] = await this.groupService.getAllGroups()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listGroupByIdAction = createAsyncThunk(
    'group/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IGroup = await this.groupService.getGroup(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateGroupAction = createAsyncThunk(
    'group/update',
    async (
      group: { id: string; data: IGroup },
      { rejectWithValue }
    ) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.groupService.updateGroup(group.id, group.data, config)
        toast.success('Grupo atualizado com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeGroupAction = createAsyncThunk(
    'group/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.groupService.deleteGroup(id)
        toast.success('Grupo removido com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
