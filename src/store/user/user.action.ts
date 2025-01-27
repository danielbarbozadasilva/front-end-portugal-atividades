import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IUser } from '../../models/models.index'
import UserService from '../../services/users'

export default class UserAction {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public listAllUsersAction = createAsyncThunk(
    'user/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IUser[] = await this.userService.getAllUsers()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listUserByIdAction = createAsyncThunk(
    'user/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IUser = await this.userService.getUser(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateUserAction = createAsyncThunk(
    'user/update',
    async (user: any, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.userService.updateUser(user.id, user.data, config)
        toast.success('Usuário atualizado com sucesso');
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeUserAction = createAsyncThunk(
    'user/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.userService.deleteUser(id)
        toast.success('Usuário removido com sucesso');
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
