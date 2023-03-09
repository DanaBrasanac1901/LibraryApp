import { useState } from 'react'

import { Routes, Route, useLocation } from 'react-router-dom'

import { HomePage } from './pages/homePage/HomePage'
import { BookDetails } from './pages/bookDetails/BookDetails'
import { FooterMenu } from './components/footerMenu/FooterMenu'
import { ProfilePage } from './pages/profilePage/ProfilePage'
import { SideMenu } from './components/sideMenu/SideMenu'
import { ConditionalWrapper } from './components/ConditionalWrapper'
import { HeaderMenu } from './components/headerMenu/HeaderMenu'
import { SearchBar } from './components/searchBar/SearchBar'
import { LoginPage } from './pages/loginPage/LoginPage'

import './App.css'

function App() {
  const location = useLocation()
  const [ authenticated, setAuthenticated ] =  useState<boolean>(false)
  return (
    <div className='app'>
      <header className='app-header'>
        {location.pathname !== '/login' && (
          <ConditionalWrapper
            condition={screen.availWidth > 768}
            wrapper={(children) => (
              <HeaderMenu isAuthenticated={authenticated} setAuthenticated={setAuthenticated}>
                <SearchBar />
              </HeaderMenu>
            )}
          >
            <SearchBar />
          </ConditionalWrapper>
        )}
      </header>
      <div className='app-view'>
        {location.pathname !== '/login' && <SideMenu isAuthenticated = {authenticated}/>}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='details' element={<BookDetails />} />
          <Route path='profile' element={<ProfilePage setAuthenticated={setAuthenticated} />} />
          <Route path='login' element={<LoginPage setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
      {location.pathname !== '/login' && <FooterMenu isAuthenticated={authenticated} />}
    </div>
  )
}

export default App
