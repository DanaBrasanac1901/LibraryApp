import { useEffect, useState } from 'react'

import moment from 'moment'
import { IoIosAddCircle } from 'react-icons/io'

import { Author } from '../../interfaces/Author'
import { CreateBookDialogProps } from '../../interfaces/CreateBookDialogProps'
import { getAllAuthors } from '../../services/AuthorService'
import { CreateAuthorForm } from '../createAuthorForm/CreateAuthorForm'


import './createBookDialog.css'

export function CreateBookDialog({ setShowCreateBookDialog }: CreateBookDialogProps) {

  const [ authors, setAuthors ] = useState<Author[]>([])
  const [ showCreateAuthorForm, setShowCreateAuthorForm ] = useState(false)
  const [ requestData, setrequestData ] = useState({
    'Title': '',
    'Description': '',
    'ISBN': '',
    'Quantity': 0,
    'PublishDate': Date(),
    'AuthorIds': Array<string>(),
    'Cover': new Blob()
  })

  useEffect(() => {
    getAuthorsForSelect().then((data) => setAuthors(data ?? [])).catch(e => console.log(e))
  }, [])

  const createBook = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    console.log(requestData)
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
    setrequestData({ ...requestData, [name]: value })
  }

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values =  Array.from(event.target.selectedOptions, option => option.value)
    setrequestData({ ...requestData, [event.target.name]: values })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setrequestData({ ...requestData, ['Cover']: event.target.files[0] })
    }
  }



  return (
    <div className='modal-dialog-overlay'>
      <div className='create-book-modal'>
        <form className='create-book-form' onSubmit={e=> void createBook(e)}>
          <label>Title</label>
          <input type='text' className='create-book-input' name='Title' onChange={(e)=>inputChangeHandler(e)}/>
          <label>Description</label>
          <input type='text' className='create-book-input' name='Description' onChange={(e)=>inputChangeHandler(e)}/>
          <label>ISBN</label>
          <input type='text' className='create-book-input' name='ISBN' onChange={(e)=>inputChangeHandler(e)}/>
          <label>Date published</label>
          <input type='date' className='create-book-input' name='PublishDate' max={moment().format('YYYY-MM-DD')} onChange={(e)=>inputChangeHandler(e)} />
          <label>Quantity</label>
          <input type='number' className='create-book-input' name='Quantity' min='1' max='50' onChange={(e)=>inputChangeHandler(e)}/>
          <label>Add Cover</label>
          <input id='create-book-file-input' name='Cover' className='create-book-input' type='file' onChange={(e) =>handleFileChange(e)} />
          <div className='create-book-icon-label-segment' >
            <label>Authors</label>
            <IoIosAddCircle className='icon' onClick={changeVisibilityOfCreateAuthorForm}/>
          </div>
          <div id='multiple-select-combo-overlay'>
            <select name='AuthorIds'
              value={requestData.AuthorIds}
              className='create-book-combo'
              required multiple={true}
              size={3}
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
