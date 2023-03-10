import { AxiosResponse } from 'axios'

import { LoginResponse } from '../interfaces/LogInResponse'


export const setSessionStorage = (tokenData: AxiosResponse<LoginResponse>) => {

  sessionStorage.setItem('accessToken', tokenData.data.accessToken)
  sessionStorage.setItem('expiration', tokenData.data.expiration)
  sessionStorage.setItem('refreshAccessToken', tokenData.data.refreshToken)

}

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken')
}

export const getRefreshAccessToken = () => {
  return sessionStorage.getItem('refreshAccessToken')
}

export const getTokenExpiration = () => {
  return sessionStorage.getItem('expiration')
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}

export const isUserAuthenticated = () => {
  return getAccessToken() !== null
}
