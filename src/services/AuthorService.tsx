import axios, { AxiosResponse } from 'axios'

import { Author } from '../interfaces/Author'
import { CreateAuthorBody } from '../interfaces/CreateAuthorBody'

const url: string = process.env.REACT_APP_API_URL ?? ''

export const getAllAuthors = async () : Promise<AxiosResponse<Author[]>> =>{
  if(url) return axios.get<Author[]>( `${url}Authors`)
  return Promise.reject(Error('URL not valid'))
}


export const createAuthor = async (author:CreateAuthorBody) => {
  if(url) return axios.post(`${url}Authors`, author)
  return Promise.reject(Error('URL not valid'))
}
