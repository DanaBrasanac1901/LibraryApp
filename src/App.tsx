import { Routes, Route, Router, useLocation } from 'react-router-dom'

import { HomePage } from './pages/home-page/HomePage'
import { BookDetails } from './pages/book-details/BookDetails'
import { FooterMenu } from './components/footer-menu/FooterMenu'
import { ProfilePage } from './pages/profile-page/ProfilePage'
import { SideMenu } from './components/side-menu/SideMenu'
import { ConditionalWrapper } from './components/ConditionalWrapper'
import { HeaderMenu } from './components/header-menu/HeaderMenu'
import { SearchBar } from './components/search-bar/SearchBar'
import './app.css'
import { LoginPage } from './pages/login-page/LoginPage'

function App() {
  const location = useLocation()
  return (
    <div className='app'>
      <header className='app-header'>
        {location.pathname !== '/login' && (
          <ConditionalWrapper
            condition={screen.availWidth > 768}
            wrapper={(children) => (
              <HeaderMenu>
                <SearchBar />
              </HeaderMenu>
            )}
          >
            <SearchBar />
          </ConditionalWrapper>
        )}
      </header>
      <div className='app-view'>
        {location.pathname !== '/login' && <SideMenu />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='details' element={<BookDetails />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </div>
      {location.pathname !== '/login' && <FooterMenu />}
    </div>
  )
}

export default App
