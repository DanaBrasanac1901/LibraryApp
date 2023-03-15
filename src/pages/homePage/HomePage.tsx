import { useState } from 'react'

import { CreateBook } from '../../components/createBook/CreateBook'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { createBook } from '../../services/BookService'
import { isUserAdmin } from '../../services/SessionStorageService'
import './homePage.css'

export function HomePage() {

  const [ showCreateBookDialog, setShowCreateBookDialog ] = useState(false)
  const [ bookData, setBookData ] = useState({
    'Title': '',
    'Description': '',
    'ISBN': '',
    'Quantity': 0,
    'PublishDate': '',
    'AuthorIds': [] as string[],
    'Cover': new Blob()
  })

  const openDialog = () => {
    setShowCreateBookDialog(true)
  }

  const createBookSubmit = async () => {
    const formData = new FormData()
    formData.append('Title', bookData.Title)
    formData.append('Description', bookData.Description)
    formData.append('ISBN', bookData.ISBN)
    formData.append('Quantity', bookData.Quantity.toString())
    formData.append('Cover', bookData.Cover)
    formData.append('PublishDate', bookData.PublishDate)
    bookData.AuthorIds.forEach((authorId) => formData.append('AuthorIds', authorId))
    try{
      await createBook(formData)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='home-page'>
      {isUserAdmin() && <button onClick = {openDialog}>Add book</button>}
      {showCreateBookDialog &&
        <ModalDialog setShowDialog = {setShowCreateBookDialog} onSubmit = {() =>{void createBookSubmit()}}>
          <CreateBook setBookData = {setBookData} bookData = {bookData}/>
        </ModalDialog>}
    </div>
  )
}
