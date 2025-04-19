import http from '../../config/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthStorage } from '../../config/auth';
import AuthService from '../../services/auth';
import { IAuthParams, IAuthResponse, IDataResponse, IResponseError, ITokenResponse } from './types';

export class AuthAction {
  private authStorage: AuthStorage;
  private authService: AuthService;

  constructor() {
    this.authStorage = new AuthStorage();
    this.authService = new AuthService();
  }

  public signInAction = createAsyncThunk(
    'auth/login',
    async (data: { email: string; password: string }): Promise<IAuthResponse | boolean> => {
      try {
        const resultAuth: IAuthResponse | any = await this.authService.loginService({ email: data.email, password: data.password });
        if (resultAuth.success) {
          this.authStorage.saveAuth(resultAuth?.data);
          http.defaults.headers.token = resultAuth.data.token;
          toast.success('Login realizado com sucesso');
          return resultAuth;
        } else {
          toast.error('Usuário ou senha inválidos');
          return false;
        }
      } catch (error: any) {
        toast.error('Erro ao fazer login');
        return false;
      }
    }
  );

  public logoutAction = createAsyncThunk(
    'auth/logout',
    async (data: { _id: string }): Promise<IAuthResponse | IResponseError> => {
      try {
        const result = await this.authService.logoutService({ _id: data._id });
        this.authStorage.removeToken();
        return result;
      } catch (error: any) {
        toast.error('Erro ao fazer login');
        return { success: false };
      }
    }
  );

  public refreshTokenAction = createAsyncThunk(
    'auth/refresh-token',
    async (data: { _id: string }): Promise<ITokenResponse | IResponseError> => {
      try {
        const result = await this.authService.refreshTokenService({ _id: data._id });
        return result;
      } catch (error: any) {
        toast.error('Erro ao fazer login');
        return { success: false }
      }
    }
  );

  public checkTokenService = createAsyncThunk(
    'auth/check-token',
    async (data: { token: string }): Promise<IDataResponse | IResponseError> => {
      try {
        const result = await this.authService.checkTokenService({ token: data.token });
        return result;
      } catch (error: any) {
        toast.error('Ocorreu um Erro.');
        return { success: false }
      }
    }
  );

  public resetPassword = createAsyncThunk(
    'auth/reset-password',
    async (data: IAuthParams): Promise<IDataResponse | IResponseError> => {
      try {
        const result = await this.authService.resetPasswordService({ email: data.email, recoveryCode: data.recoveryCode, newPassword: data.newPassword });
        toast.success('Senha alterada com sucesso.');
        return result;
      } catch (error: any) {
        toast.error('Ocorreu um erro ao alterar a senha.');
        return { success: false }
      }
    }
  );

  public passwordRecovery = createAsyncThunk(
    'auth/password-recovery',
    async (data: { email: string }): Promise<IDataResponse | IResponseError> => {
      try {
        const result = await this.authService.passwordRecoveryService({ email: data.email });
        toast.success('Recuperação de senha solicitada com sucesso.');
        return result;
      } catch (error: any) {
        toast.error('Erro ao solicitar recuperação de senha.');
        return { success: false }
      }
    }
  );
}
