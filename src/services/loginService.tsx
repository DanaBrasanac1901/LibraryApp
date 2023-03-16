import axios, { AxiosResponse } from 'axios'

import { LoginCredentials } from '../interfaces/LogInCredentials'
import { LoginResponse } from '../interfaces/LogInResponse'

const url: string = process.env.REACT_APP_API_URL ?? ''
export const logIn = async (credentials: LoginCredentials ) : Promise<AxiosResponse<LoginResponse>> => {
  if(url) return axios.post<LoginResponse>(`${url}Auth/login`, credentials)
  return Promise.reject(Error('URL not valid'))
}
