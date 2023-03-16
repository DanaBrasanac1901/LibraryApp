import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { FooterMenu } from './components/footerMenu/FooterMenu'
import { SideMenu } from './components/sideMenu/SideMenu'
import { ConditionalWrapper } from './components/ConditionalWrapper'
import { HeaderMenu } from './components/headerMenu/HeaderMenu'
import { SearchBar } from './components/searchBar/SearchBar'
import { AppRouter } from './router/AppRouter'
import { isUserAuthenticated } from './services/SessionStorageService'
import { configureAxios } from './AxiosConfig'
import './App.css'

configureAxios()

function App() {
  const location = useLocation()
  const [ isAuthenticated, setIsAuthenticated ] =  useState(isUserAuthenticated())

  const isOnLoginPage = () => {
    return location.pathname === '/login'
  }

  return (
    <div className='app'>
      <header className='app-header'>
        {!isOnLoginPage() && (
          <ConditionalWrapper
            condition={screen.availWidth > 768}
            wrapper={(children) => (
              <HeaderMenu isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                <SearchBar />
              </HeaderMenu>
            )}
          >
            <SearchBar />
          </ConditionalWrapper>
        )}
      </header>
      <div className='app-view'>
        {!isOnLoginPage() &&
        <SideMenu isAuthenticated = {isAuthenticated}/>}
        <AppRouter  setIsAuthenticated={setIsAuthenticated} />
      </div>
      {!isOnLoginPage() && <FooterMenu isAuthenticated={isAuthenticated} />}
    </div>
  )
}

export default App
