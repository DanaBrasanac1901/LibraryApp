import { Navigate, Outlet } from 'react-router-dom'

import { isUserAuthenticated } from '../services/SessionStorageService'

const PrivateRoutes = () => {
  return (
    isUserAuthenticated() ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes
