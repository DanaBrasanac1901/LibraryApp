import { useEffect, useState } from 'react'

import { Author } from '../../interfaces/Author'
import { CreateBookDialogProps } from '../../interfaces/CreateBookDialogProps'
import { getAllAuthors } from '../../services/AuthorService'
import './createBookDialog.css'

export function CreateBookDialog({ setShowCreateBookDialog }: CreateBookDialogProps) {
  const [ authors, setAuthors ] = useState<Author[]>([])

  useEffect(() => {
    getAuthorsForSelect().then((data) => setAuthors(data ?? [])).catch(e => console.log(e))
  }, [])

  const createBook = () => {
    console.log('dsbffj')
  }
  const closeDialog = () => {
    setShowCreateBookDialog(false)
  }
  const getAuthorsForSelect = async ()  => {
    try{
      return (await getAllAuthors()).data
    }catch(error){
      error
    }
  }
  return (
    <div className='modal-dialog-overlay'>
      <div className='create-book-modal'>
        <form className='create-book-form' onSubmit={createBook}>
          <label>Title</label>
          <input type='text'/>
          <label>Description</label>
          <input type='text'/>
          <label>ISBN</label>
          <input type='text'/>
          <label>Date published</label>
          <input type='date' />
          <label>Authors</label>
          <div id='multiple-select-combo-overlay'>
            <select className='create-book-combo' required multiple >
              {authors.map((author) => <option key={author.Id} value={JSON.stringify(author)}>{`${author.FirstName} ${author.LastName}`}</option>)}
            </select>
          </div>
          <label>Quantity</label>
          <select className='create-book-combo'>
            <option>1</option>
            <option>2</option>
          </select>
          <label>Add Cover</label>
          <div className='create-book-dialog-buttons'>
            <button className='create-book-button' onClick={createBook}>Submit</button>
            <button className='create-book-button' onClick={closeDialog}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
