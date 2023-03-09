import axios, { AxiosResponse } from 'axios'

import { LoginCredentials } from '../interfaces/LogInCredentials'
import { LoginResponse } from '../interfaces/LogInResponse'

export const logIn = async (credentials: LoginCredentials ) : Promise<AxiosResponse<LoginResponse>> => axios.post<LoginResponse>('https://library-practice-app.azurewebsites.net/api/Auth/login', credentials)
