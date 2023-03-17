import axios, { AxiosResponse } from 'axios'

import { BookDetailsResponse } from '../interfaces/BookDetailsResponse'
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

export const getBookDetails = async (bookId : number) : Promise<AxiosResponse<BookDetailsResponse>>=> {
  if(url) return axios.get(`${url}Books/${bookId}`)
  return Promise.reject(Error('URL not valid'))
}
