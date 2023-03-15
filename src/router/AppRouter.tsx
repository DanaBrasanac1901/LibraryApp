import { Routes, Route } from 'react-router-dom'

import { AppRouterProps } from '../interfaces/AppRouterProps'
import { BookDetails } from '../pages/bookDetails/BookDetails'
import { HomePage } from '../pages/homePage/HomePage'
import { LoginPage } from '../pages/loginPage/LoginPage'
import { ProfilePage } from '../pages/profilePage/ProfilePage'
import { PrivateRoutes } from './PrivateRoutes'

export function AppRouter({ setIsAuthenticated }: AppRouterProps){

  return(
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path='profile' element={<ProfilePage setIsAuthenticated={setIsAuthenticated} />} />
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='details' element={<BookDetails />} />
      <Route path='login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  )
}
