import { createSlice } from '@reduxjs/toolkit';
import { AuthStorage } from '../../config/auth';
import { AuthAction } from './auth.action';
import { IUserState } from './types';

export class AuthSlice {
  private authActionInstance: AuthAction;
  private authStorage: AuthStorage;
  public slice;

  constructor() {
    this.authActionInstance = new AuthAction();
    this.authStorage = new AuthStorage();

    this.slice = createSlice({
      name: 'auth',
      initialState: {
        loading: false,
        token: '',
        user: this.authStorage.getUser(), // Recupera usuário do storage (caso exista)
        error: '',
        registered: false
      } as IUserState,
      reducers: {
        /**
         * Você pode expor actions síncronas aqui, por exemplo, para deslogar
         * o usuário de forma imediata no Redux, sem async thunk.
         */
        logoutUser: (state) => {
          this.authStorage.removeToken();
          state.token = '';
          state.user = {};
          state.error = '';
        }
      },
      extraReducers: (builder) => {
        /**
         * signInAction
         */
        builder
          .addCase(this.authActionInstance.signInAction.pending, (state) => {
            state.loading = true;
          })
          .addCase(this.authActionInstance.signInAction.fulfilled, (state, action) => {
            state.loading = false;
            /**
             * Se o backend retorna IAuthResponse em caso de sucesso, 
             * action.payload será esse objeto, contendo:
             * { status, success, message, data: { token, username, name, ... } }
             */
            if (action.payload && typeof action.payload !== 'boolean') {
              state.registered = true;
              state.token = action.payload?.data?.token || '';
              state.user = action.payload?.data || {};
            } else {
              // Se veio false, significa que não houve sucesso
              state.error = 'Usuário ou senha inválidos';
            }
          })
          .addCase(this.authActionInstance.signInAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Erro ao fazer login';
          });

        /**
         * logoutAction
         */
        builder
          .addCase(this.authActionInstance.logoutAction.pending, (state) => {
            state.loading = true;
          })
          .addCase(this.authActionInstance.logoutAction.fulfilled, (state, action) => {
            state.loading = false;
            state.token = '';
            state.registered = false;
            state.user = {};
            state.error = '';
            this.authStorage.removeToken();
          })
          .addCase(this.authActionInstance.logoutAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Erro ao fazer logout';
          });

        /**
         * refreshTokenAction
         */
        builder
          .addCase(this.authActionInstance.refreshTokenAction.pending, (state) => {
            state.loading = true;
          })
          .addCase(this.authActionInstance.refreshTokenAction.fulfilled, (state, action: any) => {
            state.loading = false;
            /**
             * Verificamos se o payload é do tipo ITokenResponse (caso success = true).
             * Se for false, significa que é IResponseError.
             */
            if ('success' in action.payload && action.payload.success) {
              // Exemplo: atualiza o token no state, caso venha do backend
              // e o salve no AuthStorage (caso seja a lógica do seu projeto).
              const newToken = action.payload?.data?.token;
              if (newToken) {
                state.token = newToken;
                this.authStorage.saveAuth(action.payload.data);
              }
            } else {
              state.error = 'Falha ao atualizar token';
            }
          })
          .addCase(this.authActionInstance.refreshTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Erro ao atualizar token';
          });

        /**
         * checkTokenService
         */
        builder
          .addCase(this.authActionInstance.checkTokenService.pending, (state) => {
            state.loading = true;
          })
          .addCase(this.authActionInstance.checkTokenService.fulfilled, (state, action) => {
            state.loading = false;
            /**
             * O serviço de checkTokenService retorna IResponseError ou IDataResponse,
             * porém, no AuthService está retornando { success: boolean } (caso válido/ inválido).
             */
            if (!action.payload.success) {
              state.error = 'Token inválido ou expirado';
            }
          })
          .addCase(this.authActionInstance.checkTokenService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Erro ao verificar token';
          });

        /**
         * resetPassword
         */
        builder
          .addCase(this.authActionInstance.resetPassword.pending, (state) => {
            state.loading = true;
          })
          .addCase(this.authActionInstance.resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            if (!action.payload.success) {
              // Se a resposta for IResponseError (ou seja, success = false)
              state.error = 'Não foi possível redefinir a senha';
            } else {
              // Se for sucesso (IDataResponse)
              // Caso queira armazenar algo no state, faça aqui
            }
          })
          .addCase(this.authActionInstance.resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Erro ao redefinir senha';
          });

        /**
         * passwordRecovery
         */
        builder
          .addCase(this.authActionInstance.passwordRecovery.pending, (state) => {
            state.loading = true;
          })
          .addCase(this.authActionInstance.passwordRecovery.fulfilled, (state, action) => {
            state.loading = false;
            if (!action.payload.success) {
              state.error = 'Não foi possível enviar o e-mail de recuperação';
            } else {
              // Se quiser salvar algo no state, adicione aqui
            }
          })
          .addCase(this.authActionInstance.passwordRecovery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Erro ao solicitar recuperação de senha';
          });
      }
    });
  }

  public getActions() {
    return this.slice.actions;
  }

  public getAuthActions() {
    return this.authActionInstance;
  }

  public getReducer() {
    return this.slice.reducer;
  }
}

const authSliceInstance = new AuthSlice();

// Ação síncrona disponibilizada dentro de 'reducers' -> { logoutUser }
export const { logoutUser } = authSliceInstance.getActions();

// Actions assíncronas (async thunks) importadas de AuthAction
export const {
  signInAction,
  logoutAction,
  refreshTokenAction,
  checkTokenService,
  resetPassword,
  passwordRecovery
} = authSliceInstance.getAuthActions();

export default authSliceInstance.getReducer();
