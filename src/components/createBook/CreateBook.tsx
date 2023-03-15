import { useState, useEffect } from 'react'

import moment from 'moment'
import { IoIosAddCircle as AddIcon } from 'react-icons/io'

import { Author } from '../../interfaces/Author'
import { getAllAuthors } from '../../services/AuthorService'
import { CreateAuthorForm } from '../createAuthorForm/CreateAuthorForm'
import { CreateBookProps } from '../../interfaces/CreateBookProps'
import './createBook.css'


export function CreateBook ({ setBookData, bookData }: CreateBookProps){
  const [ showCreateAuthorForm, setShowCreateAuthorForm ] = useState(false)
  const [ authors, setAuthors ] = useState<Author[]>([])


  useEffect(() => {
    getAuthorsForSelect().then((data) => setAuthors(data ?? [])).catch(e => console.log(e))
  }, [])

  const toggleAuthorsForm = () => {
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
  const changeAuthorsHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values =  Array.from(event.target.selectedOptions, option => option.value)
    setBookData({ ...bookData, [event.target.name]: values })
  }

  const changeCoverPhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setBookData({ ...bookData, ['Cover']: event.target.files[0] })
    }
  }
  return(
    <>
      <form className='book-data-form'>
        <label>Title</label>
        <input type='text' className='book-data-input' name='Title' required onChange={(e)=>inputChangeHandler(e)}/>
        <label>Description</label>
        <input type='text' className='book-data-input' name='Description' onChange={(e)=>inputChangeHandler(e)}/>
        <label>ISBN</label>
        <input type='text' className='book-data-input' name='ISBN' required onChange={(e)=>inputChangeHandler(e)}/>
        <label>Date published</label>
        <input type='date' className='book-data-input' name='PublishDate' max={moment().format('YYYY-MM-DD')} onChange={(e)=>inputChangeHandler(e)} />
        <label>Quantity</label>
        <input type='number' className='book-data-input' required name='Quantity' min='1' max='50' onChange={(e)=>inputChangeHandler(e)}/>
        <label>Add Cover</label>
        <input id='create-book-file-input' name='Cover' className='book-data-input' type='file' onChange={(e) =>changeCoverPhotoHandler(e)} />
        <div className='create-book-icon-label-segment' >
          <label>Authors</label>
          <AddIcon className='icon' onClick={toggleAuthorsForm}/>
        </div>
        <div id='multiple-select-combo-overlay'>
          <select name='AuthorIds'
            value={bookData.AuthorIds}
            className='create-book-combo'
            multiple={true}
            size={4}
            onChange={(e)=> changeAuthorsHandler(e) }
          >
            {authors.map((author) => <option key={author.Id} value={author.Id}>{`${author.FirstName} ${author.LastName}`}</option>)}
          </select>
        </div>
      </form>
      { showCreateAuthorForm && <CreateAuthorForm />}
    </>
  )
}
