import { useEffect, useState } from 'react'

import moment from 'moment'
import { IoIosAddCircle as AddIcon } from 'react-icons/io'

import { Author } from '../../interfaces/Author'
import { CreateBookDialogProps } from '../../interfaces/CreateBookDialogProps'
import { getAllAuthors } from '../../services/AuthorService'
import { CreateAuthorForm } from '../createAuthorForm/CreateAuthorForm'
import { createBook } from '../../services/BookService'

import './createBookDialog.css'

export function CreateBookDialog({ setShowCreateBookDialog }: CreateBookDialogProps) {

  const [ authors, setAuthors ] = useState<Author[]>([])
  const [ showCreateAuthorForm, setShowCreateAuthorForm ] = useState(false)
  const [ bookData, setBookData ] = useState({
    'Title': '',
    'Description': '',
    'ISBN': '',
    'Quantity': 0,
    'PublishDate': '',
    'AuthorIds': [] as string[],
    'Cover': new Blob()
  })

  useEffect(() => {
    getAuthorsForSelect().then((data) => setAuthors(data ?? [])).catch(e => console.log(e))
  }, [])

  const handleBookSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
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
      closeDialog()
    }catch(err){
      err
    }
  }

  const closeDialog = () => {
    setShowCreateBookDialog(false)
  }

  const changeVisibilityOfCreateAuthorForm = () => {
    setShowCreateAuthorForm(!showCreateAuthorForm)
  }

  const getAuthorsForSelect = async ()  => {
    try{
      return (await getAllAuthors()).data
    }catch(error){
      error
    }
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBookData({ ...bookData, [name]: value })
  }
  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values =  Array.from(event.target.selectedOptions, option => option.value)
    setBookData({ ...bookData, [event.target.name]: values })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setBookData({ ...bookData, ['Cover']: event.target.files[0] })
    }
  }

  return (
    <div className='modal-dialog-overlay'>
      <div className='create-book-modal'>
        <form className='create-book-form' onSubmit={e=> void handleBookSubmit(e)}>
          <label>Title</label>
          <input type='text' className='create-book-input' name='Title' required onChange={(e)=>inputChangeHandler(e)}/>
          <label>Description</label>
          <input type='text' className='create-book-input' name='Description' onChange={(e)=>inputChangeHandler(e)}/>
          <label>ISBN</label>
          <input type='text' className='create-book-input' name='ISBN' required onChange={(e)=>inputChangeHandler(e)}/>
          <label>Date published</label>
          <input type='date' className='create-book-input' name='PublishDate' max={moment().format('YYYY-MM-DD')} onChange={(e)=>inputChangeHandler(e)} />
          <label>Quantity</label>
          <input type='number' className='create-book-input' required name='Quantity' min='1' max='50' onChange={(e)=>inputChangeHandler(e)}/>
          <label>Add Cover</label>
          <input id='create-book-file-input' name='Cover' className='create-book-input' type='file' onChange={(e) =>handleFileChange(e)} />
          <div className='create-book-icon-label-segment' >
            <label>Authors</label>
            <AddIcon className='icon' onClick={changeVisibilityOfCreateAuthorForm}/>
          </div>
          <div id='multiple-select-combo-overlay'>
            <select name='AuthorIds'
              value={bookData.AuthorIds}
              className='create-book-combo'
              multiple={true}
              size={4}
              onChange={(e)=> selectChangeHandler(e) }
            >
              {authors.map((author) => <option key={author.Id} value={author.Id}>{`${author.FirstName} ${author.LastName}`}</option>)}
            </select>
          </div>
          <div className='create-book-dialog-buttons'>
            <button className='create-book-button' type='submit'>Submit</button>
            <button className='create-book-button' onClick={closeDialog}>Cancel</button>
          </div>
        </form>
        { showCreateAuthorForm && <CreateAuthorForm />}
      </div>
    </div>
  )
}