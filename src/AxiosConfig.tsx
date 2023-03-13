import axios from 'axios'

import { getAccessToken } from './services/SessionStorageService'

export const configureAxios = () => {
  axios.interceptors.request.use(
    config => {
      config.headers = config.headers ?? {}
      const token = getAccessToken()
      if(token === null) return config
      config.headers.Authorization = `Bearer ${token}`
      return config
    },
    function(error){
      return Promise.reject(error)
    }
  )

}
