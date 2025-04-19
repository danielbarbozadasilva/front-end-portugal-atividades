import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import LocalizationAction from './localization.action'

export class LocalizationSlice {
  private localizationActionInstance: LocalizationAction
  public slice: Slice

  constructor() {
    this.localizationActionInstance = new LocalizationAction()

    this.slice = createSlice({
      name: 'localization',
      initialState: {
        loading: false,
        language: 'pt-BR', // idioma padrão
        error: ''
      },
      reducers: {
        // Se quiser outras actions puras, adicione aqui
      },
      extraReducers: (builder) => {
        builder
          // setLanguageAction
          .addCase(
            this.localizationActionInstance.setLanguageAction.pending,
            (state) => {
              state.loading = true
            }
          )
          .addCase(
            this.localizationActionInstance.setLanguageAction.fulfilled,
            (state, action: PayloadAction<string>) => {
              state.loading = false
              state.language = action.payload
            }
          )
          .addCase(
            this.localizationActionInstance.setLanguageAction.rejected,
            (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Falha ao mudar idioma'
            }
          )
      }
    })
  }

  /**
   * Retorna as actions assíncronas criadas via createAsyncThunk
   */
  public getLocalizationActions() {
    return this.localizationActionInstance
  }

  /**
   * Retorna o reducer
   */
  public getReducer() {
    return this.slice.reducer
  }
}

// Instância única para exportar
const localizationSliceInstance = new LocalizationSlice()

// Extraímos as actions assíncronas para usar fora
export const {
  setLanguageAction
} = localizationSliceInstance.getLocalizationActions()

// Export default do reducer
export default localizationSliceInstance.getReducer()
