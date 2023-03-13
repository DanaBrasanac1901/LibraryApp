import { useState } from 'react'

import { CreateBookDialog } from '../../components/createBookDialog/CreateBookDialog'
import './homePage.css'

export function HomePage() {
  const [ showCreateBookDialog, setShowCreateBookDialog ] = useState(false)
  const openDialog = () => {
    setShowCreateBookDialog(true)
  }
  return (
    <div className='home-page'>
      <button onClick={openDialog}>Add book</button>
      {showCreateBookDialog && <CreateBookDialog setShowCreateBookDialog = {setShowCreateBookDialog} />}
    </div>
  )
}
