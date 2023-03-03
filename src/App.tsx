import './App.css'
import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage.component'
import { BookDetails } from './pages/BookDetails.component'
import { FooterMenu } from './components/FooterMenu.component'

function App() {
  return (
    <div className='App'>
      <header className='App-header' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='details' element={<BookDetails />} />
      </Routes>
      <FooterMenu />
    </div>
  )
}

export default App
