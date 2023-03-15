import { Navigate, Outlet } from 'react-router-dom'

import { isUserAuthenticated } from '../services/SessionStorageService'

export const PrivateRoutes = () => {
  return (
    isUserAuthenticated() ? <Outlet/> : <Navigate to='/login'/>
  )
}
