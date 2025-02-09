import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IActivity, IActivityFilters } from '../../models/models.activity'
import ActivityService from '../../services/activity'

export default class ActivityAction {
  private activityService: ActivityService

  constructor() {
    this.activityService = new ActivityService()
  }

  public listAllActivitiesAction = createAsyncThunk(
    'activity/listAll',
    async (filters: IActivityFilters, { rejectWithValue }) => {
      try {
        const response: any = await this.activityService.getAllActivities(filters)
        return response?.data as any;
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listActivityByIdAction = createAsyncThunk(
    'activity/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IActivity = await this.activityService.getActivity(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateActivityAction = createAsyncThunk(
    'activity/update',
    async (activity: { id: string; data: IActivity }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        await this.activityService.updateActivity(activity.id, activity.data, config)
        toast.success('Atividade atualizada com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeActivityAction = createAsyncThunk(
    'activity/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.activityService.deleteActivity(id)
        toast.success('Atividade removida com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
