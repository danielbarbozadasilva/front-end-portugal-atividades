import axios from 'axios'
import { getToken } from './auth'
import { logoutAction } from '../store/auth/auth.action'
import { history } from '../hooks/navigation-context'
import { toast } from 'react-toastify'

const baseURL = process.env.REACT_APP_BASE_URL!;

const http = axios.create({ baseURL });

http.defaults.headers['content-type'] = 'application/json'

if (getToken()) {
  http.defaults.headers.token = getToken()
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.code === 'ERR_NETWORK') {
      history.push('/error500')
    }

    switch (error.response?.status) {
      case 401:
        if (getToken()) {
          logoutAction()
          history.push('/signin')
          toast.warning('Token temporário expirado!')
        }
        break
      case 403:
        history.push('/error403')
        break
      case 404:
        history.push('/error404')
        break
      case 500:
        history.push('/error500')
        break
      default:
        break
    }
    
    window.location.reload()
    return Promise.reject(error)
  }
)

export default http
