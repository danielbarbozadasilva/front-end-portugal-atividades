import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import ContentPageAction from './contentPage.action'
import { IContentPage } from '../../models/models.index'

export class ContentPageSlice {
  private contentPageActionInstance: ContentPageAction
  public slice: Slice

  constructor() {
    this.contentPageActionInstance = new ContentPageAction()

    this.slice = createSlice({
      name: 'contentPage',
      initialState: {
        loading: false,
        all: [] as IContentPage[],
        contentpageid: {} as IContentPage,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(this.contentPageActionInstance.listAllContentPagesAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.contentPageActionInstance.listAllContentPagesAction.fulfilled,
            (state, action: PayloadAction<IContentPage[]>) => {
              state.loading = false
              state.all = action.payload
            }
          )
          .addCase(this.contentPageActionInstance.listAllContentPagesAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.contentPageActionInstance.listContentPageByIdAction.pending, (state) => {
            state.loading = true
          })
          .addCase(
            this.contentPageActionInstance.listContentPageByIdAction.fulfilled,
            (state, action: PayloadAction<IContentPage>) => {
              state.loading = false
              state.contentpageid = action.payload
            }
          )
          .addCase(this.contentPageActionInstance.listContentPageByIdAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        builder
          .addCase(this.contentPageActionInstance.updateContentPageAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.contentPageActionInstance.updateContentPageAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.contentPageActionInstance.updateContentPageAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })

        // removeContentPageAction
        builder
          .addCase(this.contentPageActionInstance.removeContentPageAction.pending, (state) => {
            state.loading = true
          })
          .addCase(this.contentPageActionInstance.removeContentPageAction.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(this.contentPageActionInstance.removeContentPageAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch'
          })
      }
    })
  }

  public getActions() {
    return this.slice.actions
  }

  public getContentPageActions() {
    return this.contentPageActionInstance
  }

  public getReducer() {
    return this.slice.reducer
  }
}

const contentPageSliceInstance = new ContentPageSlice()

export const { setError } = contentPageSliceInstance.getActions()

export const {
  listAllContentPagesAction,
  listContentPageByIdAction,
  updateContentPageAction,
  removeContentPageAction
} = contentPageSliceInstance.getContentPageActions()

export default contentPageSliceInstance.getReducer()
