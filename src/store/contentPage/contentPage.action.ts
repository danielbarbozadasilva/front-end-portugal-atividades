import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IContentPage } from '../../models/models.index'
import ContentPageService from '../../services/contentPages'

export default class ContentPageAction {
  private contentPageService: ContentPageService

  constructor() {
    this.contentPageService = new ContentPageService()
  }

  public listAllContentPagesAction = createAsyncThunk(
    'contentPage/listAll',
    async (_, { rejectWithValue }) => {
      try {
        const response: IContentPage[] = await this.contentPageService.getAllContentPages()
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public listContentPageByIdAction = createAsyncThunk(
    'contentPage/listById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response: IContentPage = await this.contentPageService.getContentPage(id)
        return response
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )

  public updateContentPageAction = createAsyncThunk(
    'contentPage/update',
    async (page: { id: string; data: IContentPage }, { rejectWithValue }) => {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.contentPageService.updateContentPage(page.id, page.data, config)
        toast.success('Página de conteúdo atualizada com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(false)
      }
    }
  )

  public removeContentPageAction = createAsyncThunk(
    'contentPage/remove',
    async (id: string, { rejectWithValue }) => {
      try {
        await this.contentPageService.deleteContentPage(id)
        toast.success('Página de conteúdo removida com sucesso')
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
      }
    }
  )
}
