import { IAuthUser } from './types'

export default class AuthStorage {

  private tokenKey: string

  public constructor (tokenKey: string = process.env.REACT_APP_TOKEN_KEY || 'APP_TOKEN') {
    this.tokenKey = tokenKey
  }

  public getToken(): string {
    const token = JSON.parse(localStorage.getItem(this.tokenKey) || '""')
    return token
  }

  public getUser(): IAuthUser | false {
    const user: IAuthUser = JSON.parse(localStorage.getItem(this.tokenKey) || 'null')
    return user || false
  }

  public isAuthenticated(): boolean {
    const token = this.getToken()
    return Boolean(token && token.trim().length > 0)
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  public saveAuth(data: IAuthUser): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(data))
  }
}
