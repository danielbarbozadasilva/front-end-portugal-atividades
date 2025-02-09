import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import AuthStorage from '../config/auth'
import AuthAction from '../store/auth/auth.action'
import store from '../store'

export class HttpService {
  private http: AxiosInstance
  private authStorage: AuthStorage
  private authAction: AuthAction

  constructor(baseURL: string = process.env.REACT_APP_BASE_URL || 'http://localhost:3000') {
    this.authStorage = new AuthStorage()
    this.authAction = new AuthAction()

    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const token = this.authStorage.getToken()
    if (token) {
      this.http.defaults.headers.token = token
    }

    this.http.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Erro de rede (sem resposta do servidor)
        if (error?.code === 'ERR_NETWORK') {
          // history.push('/error500')
          return Promise.reject(error)
        }

        const status = error.response?.status
        switch (status) {
          case 401:
            if (this.authStorage.getToken()) {
              await store.dispatch(this.authAction.logoutAction('ddd'))
              toast.warning('Token expirado ou inválido!')
               //history.push('/signin')
            }
            break

          case 403:
            // history.push('/error403')
            break

          case 404:
            // history.push('/error404')
            break

          case 500:
            // history.push('/error500')
            break

          default:
            // Caso queira lidar com outros códigos ou erro genérico
            console.error('Erro não tratado:', status, error.message)
            break
        }
        return Promise.reject(error)
      }
    )
  }

  public getHttp(): AxiosInstance {
    return this.http
  }
}

const httpInstance = new HttpService().getHttp()
export default httpInstance
