// HttpService.ts
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { AuthStorage } from '../config/auth';

export class HttpService {
  private http: AxiosInstance;
  private authStorage: AuthStorage;

  constructor() {
    this.authStorage = new AuthStorage();
    this.http = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL!,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const existingToken = this.authStorage.getToken();
    if (existingToken) {
      this.http.defaults.headers.token = existingToken;
    }

    this.http.interceptors.request.use(
      async (config) => {
        if (config.url?.includes('/auth/check-token')) {
          return config; 
        }

        const token = this.authStorage.getToken();

        if (token) {
          try {
            // 1) Checa se token é válido
            const resp = await this.http.post('/auth/check-token', { token });
            const data = resp.data;

            if (!data.success) {
              // Token inválido
              toast.warning('Token inválido ou expirado! Fazendo logout...');
              this.doLogout();
              // Cancela a requisição original
              return Promise.reject('Token inválido');
            }

            // Se chegou aqui, token é válido
            // 2) Adicionamos o token no header da requisição original
            config.headers.token = token;
            return config;
          } catch (err) {
            // Se deu erro no check-token, força logout
            toast.error('Erro ao validar token!');
            this.doLogout();
            return Promise.reject(err);
          }
        }

        // Se não tem token, segue a requisição, mas possivelmente
        // seu backend vai recusar. Fica a seu critério.
        return config;
      },
      (error) => {
        // Erro no próprio request interceptor
        return Promise.reject(error);
      }
    );

    // Interceptor de RESPONSE (se quiser tratar erros 401, 403, 500 etc.)
    this.http.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Se quiser tratar erros de rede
        if (error?.code === 'ERR_NETWORK') {
          // Trate erros de rede se desejar
          return Promise.reject(error);
        }

        // Exemplo: se o backend retornar 401 numa rota
        const status = error.response?.status;
        switch (status) {
          case 401:
            // Talvez forçar logout e redirecionar
            if (this.authStorage.getToken()) {
              this.doLogout();
              toast.warning('Acesso não autorizado (401)!');
            }
            break;
          case 403:
            toast.error('Acesso proibido (403)!');
            break;
          case 404:
            toast.error('Recurso não encontrado (404)!');
            break;
          case 500:
            toast.error('Erro interno do servidor (500)!');
            break;
          default:
            console.error('Erro não tratado:', status, error.message);
            toast.error(`Erro: ${error.message}`);
            break;
        }
        return Promise.reject(error);
      }
    );
  }

  // Método para efetuar logout: limpa Redux, limpa localStorage, etc.
  private doLogout() {
    this.authStorage.removeToken();
    window.location.href = '/signin'; 
  }

  public getHttp(): AxiosInstance {
    return this.http;
  }
}

// Exporta instância única do serviço
const httpInstance = new HttpService().getHttp();
export default httpInstance;
