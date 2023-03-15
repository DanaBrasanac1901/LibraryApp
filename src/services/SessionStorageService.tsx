import { AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'

import { LoginResponse } from '../interfaces/LogInResponse'
import { Token } from '../interfaces/Token'


export const setSessionStorage = (tokenData: AxiosResponse<LoginResponse>) => {

  sessionStorage.setItem('accessToken', tokenData.data?.AccessToken)
  sessionStorage.setItem('expiration', tokenData.data?.Expiration)
  sessionStorage.setItem('refreshAccessToken', tokenData.data?.RefreshToken)

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

export const decodeToken = (): Token | null=> {
  const token = getAccessToken()
  if(token!==null) return jwt_decode(token)
  return null
}

export const isUserAdmin = () => {
  const token = decodeToken()
  return token!== null && token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ==='Admin'
}
