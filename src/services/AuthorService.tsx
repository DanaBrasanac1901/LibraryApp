import axios, { AxiosResponse } from 'axios'

import { Author } from '../interfaces/Author'
import { CreateAuthorBody } from '../interfaces/CreateAuthorBody'

const url: string = process.env.REACT_APP_API_URL ?? ''

export const getAllAuthors = async () : Promise<AxiosResponse<Author[]>> =>
  axios.get<Author[]>( `${url}Authors`)

export const createAuthor = async (author:CreateAuthorBody) => axios.post(`${url}Authors`, author)
