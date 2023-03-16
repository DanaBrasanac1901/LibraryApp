import axios, { AxiosResponse } from 'axios'

import { GetAllBooksResponse } from '../interfaces/GetAllBooksResponse'
import { PaginatedBooksRequest } from '../interfaces/PaginatedBooksRequest'

const url: string = process.env.REACT_APP_API_URL ?? ''

export const createBook = async (formData:FormData) => {
  if(url) return axios.post(`${url}Books`, formData)
  return Promise.reject(Error('URL not valid'))
}
export const getAllBooksPaginated = async ({ pageNumber, pageLength }: PaginatedBooksRequest) : Promise<AxiosResponse<GetAllBooksResponse>>=> {
  if(url) return axios.get(`${url}Books/paged`, { params: { pageNumber: pageNumber, pageLength: pageLength } } )
  return Promise.reject(Error('URL not valid'))
}
