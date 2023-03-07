import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/home-page/HomePage'
import { BookDetails } from './pages/book-details/BookDetails'
import { FooterMenu } from './components/footer-menu/FooterMenu'
import { ProfilePage } from './pages/profile-page/ProfilePage'
import { SideMenu } from './components/side-menu/SideMenu'
import { ConditionalWrapper } from './components/ConditionalWrapper'
import { HeaderMenu } from './components/header-menu/HeaderMenu'
import { SearchBar } from './components/search-bar/SearchBar'

import './app.css'

function App() {
  return (
    <div className='app'>
      <header className='app-header'>
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
      </header>
      <div className='app-view'>
        <SideMenu />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='details' element={<BookDetails />} />
          <Route path='profile' element={<ProfilePage />} />
        </Routes>
      </div>
      <FooterMenu />
    </div>
  )
}

export default App
