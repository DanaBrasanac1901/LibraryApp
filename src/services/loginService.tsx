import axios, { AxiosResponse } from 'axios'

import { LoginCredentials } from '../interfaces/LogInCredentials'
import { LoginResponse } from '../interfaces/LogInResponse'

const url = process.env.REACT_APP_API_URL
export const logIn = async (credentials: LoginCredentials ) : Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>(`${url}Auth/login`, credentials)
}
