import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { FooterMenu } from './components/footerMenu/FooterMenu'
import { SideMenu } from './components/sideMenu/SideMenu'
import { ConditionalWrapper } from './components/ConditionalWrapper'
import { HeaderMenu } from './components/headerMenu/HeaderMenu'
import { SearchBar } from './components/searchBar/SearchBar'
import './App.css'
import { AppRouter } from './router/AppRouter'
import { isUserAuthenticated } from './services/SessionStorageService'

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
        {notLoginRoute() && <SideMenu isAuthenticated = {isAuthenticated}/>}
        <AppRouter  setIsAuthenticated={setIsAuthenticated} />
      </div>
      {notLoginRoute() && <FooterMenu isAuthenticated={isAuthenticated} />}
    </div>
  )
}

export default App
