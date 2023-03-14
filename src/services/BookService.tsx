import axios from 'axios'

const url: string = process.env.REACT_APP_API_URL ?? ''

export const createBook = async (formData:FormData) => axios.post(`${url}Books`, formData)
