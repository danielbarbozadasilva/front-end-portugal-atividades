import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

/**
 * Esta classe cuida das ações relacionadas ao idioma.
 * Você poderia fazer um "setLanguageAction" síncrono, 
 * mas aqui usamos `createAsyncThunk` para manter o mesmo padrão 
 * usado no restante do projeto.
 */
export default class LocalizationAction {
  public setLanguageAction = createAsyncThunk(
    'localization/setLanguage',
    async (language: string, { rejectWithValue }) => {
      try {
        // Exemplo: se quiser persistir no localStorage
        // localStorage.setItem('language', language);

        // Retorna o idioma selecionado como payload
        return language;
      } catch (error: any) {
        toast.error('Erro ao mudar o idioma');
        return rejectWithValue('Não foi possível alterar o idioma');
      }
    }
  )
}
