import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IRating } from '../../models/models.rating'
import RatingService from '../../services/ratings'

export default class RatingMethodAction {
  private ratingService: RatingService

  constructor() {
    this.ratingService = new RatingService()
  }

  public findByIdRatingAction = createAsyncThunk(
    'rating/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IRating = await this.ratingService.getRating(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public createRatingAction = createAsyncThunk(
    'rating/create',
    async (data: IRating, { rejectWithValue }) => {
      try {
        const response: IRating = await this.ratingService.createRating(data)
        toast.success('Avaliação criada com sucesso!')
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateRatingAction = createAsyncThunk(
    'rating/update',
    async (data: IRating , { rejectWithValue }) => {
      try {
        await this.ratingService.updateRating(data._id, data)
        toast.success('Avaliação atualizada com sucesso!')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public deleteRatingAction = createAsyncThunk(
    'rating/delete',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.ratingService.deleteRating(id)
        toast.success('Avaliação excluída com sucesso!')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
