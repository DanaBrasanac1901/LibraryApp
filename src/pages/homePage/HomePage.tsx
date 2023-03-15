import { useState } from 'react'

import { BookCard } from '../../components/bookCard/BookCard'
import { CreateBookDialog } from '../../components/createBookDialog/CreateBookDialog'
import { isUserAdmin } from '../../services/SessionStorageService'
import './homePage.css'

export function HomePage() {
  const [ showCreateBookDialog, setShowCreateBookDialog ] = useState(false)
  const openDialog = () => {
    setShowCreateBookDialog(true)
  }
  return (
    <div className='home-page'>
      {isUserAdmin() && <button onClick={openDialog}>Add book</button>}
      {showCreateBookDialog && <CreateBookDialog setShowCreateBookDialog = {setShowCreateBookDialog} />}
      <div className='home-page-books'>
        <BookCard/>
      </div>
    </div>

  )
}
