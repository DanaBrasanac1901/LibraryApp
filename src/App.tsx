import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { FooterMenu } from './components/footerMenu/FooterMenu'
import { SideMenu } from './components/sideMenu/SideMenu'
import { HeaderMenu } from './components/headerMenu/HeaderMenu'
import { AppRouter } from './router/AppRouter'
import { isUserAuthenticated } from './services/SessionStorageService'
import { configureAxios } from './AxiosConfig'
import './App.css'

configureAxios()

function App() {
  const location = useLocation()
  const [ isAuthenticated, setIsAuthenticated ] =  useState(isUserAuthenticated())

  const notLoginRoute = () => {
    return location.pathname !== '/login'
  }

  return (
    <div className='app'>
      <header className='app-header'>
        {notLoginRoute() && (
          <HeaderMenu isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        )}
      </header>
      <div className='app-view'>
        {notLoginRoute() &&
        <SideMenu isAuthenticated = {isAuthenticated}/>}
        <AppRouter  setIsAuthenticated={setIsAuthenticated} />
      </div>
      {notLoginRoute() && <FooterMenu isAuthenticated={isAuthenticated} />}
    </div>
  )
}

export default App
