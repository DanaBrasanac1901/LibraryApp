import { AxiosResponse } from 'axios'

import { LoginResponse } from '../interfaces/LogInResponse'


export const setSessionStorage = (tokenData: AxiosResponse<LoginResponse>) => {

  sessionStorage.setItem('tokenData', JSON.stringify(tokenData))

}

export const getSessionStorageData = () => {
  return JSON.parse(sessionStorage.getItem('tokenData') ?? '{}') as LoginResponse | null
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}

export const isUserAuthenticated = () => {
  return getSessionStorageData()?.accessToken !== undefined
}
