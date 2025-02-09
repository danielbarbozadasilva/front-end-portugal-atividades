interface IDataModel {
  token: string
  name: string
  email: string
  username: string
  permissions: string
}

export default class AuthStorage {

  private tokenKey: string

  public constructor (tokenKey: string = process.env.REACT_APP_TOKEN_KEY || 'APP_TOKEN') {
    this.tokenKey = tokenKey
  }

  public getToken(): string {
    const token = JSON.parse(localStorage.getItem(this.tokenKey) || '""')
    return token
  }

  public getUser(): IDataModel | false {
    const user: IDataModel = JSON.parse(localStorage.getItem(this.tokenKey) || 'null')
    return user || false
  }

  public isAuthenticated(): boolean {
    const token = this.getToken()
    return Boolean(token && token.trim().length > 0)
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  public saveAuth(data: IDataModel): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(data))
  }
}
