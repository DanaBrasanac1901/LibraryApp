import axios from 'axios'

const url: string = process.env.REACT_APP_API_URL ?? ''

export const createBook = async (formData:FormData) => {
  if(url) return axios.post(`${url}Books`, formData)
  return Promise.reject(Error('URL not valid'))
}
