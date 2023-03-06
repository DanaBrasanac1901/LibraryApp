import './App.css'
import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { BookDetails } from './pages/BookDetails'
import { FooterMenu } from './components/FooterMenu'
import { ProfilePage } from './pages/ProfilePage'
import { SideMenu } from './components/SideMenu'
import { ConditionalWrapper } from './components/ConditionalWrapper'
import { HeaderMenu } from './components/HeaderMenu'
import { SearchBar } from './components/SearchBar'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
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
