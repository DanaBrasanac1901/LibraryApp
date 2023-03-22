import axios, { AxiosResponse } from 'axios'

import { BookDetailsResponse } from '../interfaces/BookDetailsResponse'
import { BookHistoryResponse } from '../interfaces/BookHistoryResponse'
import { GetAllBooksResponse } from '../interfaces/GetAllBooksResponse'
import { PaginatedBooksRequest } from '../interfaces/PaginatedBooksRequest'

const url = process.env.REACT_APP_API_URL

export const createBook = async (formData:FormData) => {
  return axios.post(`${url}Books`, formData)
}
export const getAllBooksPaginated = async ({ pageNumber, pageLength }: PaginatedBooksRequest) : Promise<AxiosResponse<GetAllBooksResponse>>=> {
  return axios.get(`${url}Books/paged`, { params: { pageNumber: pageNumber, pageLength: pageLength } } )
}

export const getBookDetails = async (bookId : number) : Promise<AxiosResponse<BookDetailsResponse>>=> {
  return axios.get(`${url}Books/${bookId}`)
}

export const updateBook = async (formData:FormData) => {
  return axios.put(`${url}Books`, formData)
}

export const deleteBook = async ( bookId : string) : Promise<AxiosResponse<string>> => {
  return axios.delete(`${url}Books/${bookId}`)
}

export const getBookHistory = async ( bookId : number) : Promise<AxiosResponse<BookHistoryResponse[]>> => {
  return axios.get<BookHistoryResponse[]>(`${url}Rental/book-history/${bookId}`)
}

export const rentBook = async ( bookId : string) : Promise<AxiosResponse<string>> => {
  return axios.post(`${url}Rental/rent/${bookId}`)
}

export const returnBook = async ( rentId : string) : Promise<AxiosResponse<string>> => {
  return axios.post(`${url}Rental/return/${rentId}`)
}
