import { useState, useEffect } from 'react'

import moment from 'moment'
import { IoIosAddCircle as AddIcon } from 'react-icons/io'

import { Author } from '../../interfaces/Author'
import { getAllAuthors } from '../../services/AuthorService'
import { CreateAuthorForm } from '../createAuthorForm/CreateAuthorForm'
import { createBook } from '../../services/BookService'
import { BookFormProps } from '../../interfaces/BookFormProps'
import './bookForm.css'

export function BookForm({ submitClickEvent, bookData }: BookFormProps){
  const [ showCreateAuthorForm, setShowCreateAuthorForm ] = useState(false)
  const [ authors, setAuthors ] = useState<Author[]>([])
  const [ bookDataForRequest, setBookDataForRequest ] = useState({
    'Title': bookData ? bookData.Title : '',
    'Description': bookData ? bookData.Description : '',
    'ISBN': bookData ? bookData.ISBN : '',
    'Quantity': bookData ? bookData.Quantity : 0,
    'PublishDate': bookData ? bookData.PublishDate : '',
    'AuthorIds': bookData ? bookData.Authors.map( author => author.Id.toString()) : [],
    'Cover': bookData ? ( bookData.Cover ?? '') : new Blob()
  })

  useEffect(() => {
    const formForRequest = prepareFormData()
    if(bookData){
      //ovde ce se pozvati update
    }else{
     createBook(formForRequest).then().catch(e => console.log(e))
    }

  }, [ submitClickEvent ])

  useEffect(() => {
    getAuthorsForSelect().then((data) => setAuthors(data ?? [])).catch(e => console.log(e))
  }, [ authors ])

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

  const prepareFormData = () =>
  {
    const formData = new FormData()
    formData.append('Title', bookDataForRequest.Title)
    formData.append('Description', bookDataForRequest.Description)
    formData.append('ISBN', bookDataForRequest.ISBN)
    formData.append('Quantity', bookDataForRequest.Quantity.toString())
    formData.append('Cover', bookDataForRequest.Cover)
    formData.append('PublishDate', bookDataForRequest.PublishDate)
    bookDataForRequest.AuthorIds.forEach((authorId) => formData.append('AuthorIds', authorId))
    return formData
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBookDataForRequest({ ...bookDataForRequest, [name]: value })
  }
  const changeAuthorsHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values =  Array.from(event.target.selectedOptions, option => option.value)
    setBookDataForRequest({ ...bookDataForRequest, [event.target.name]: values })
  }

  const changeCoverPhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setBookDataForRequest({ ...bookDataForRequest, ['Cover']: event.target.files[0] })
    }
  }

  return(
    <>
      <form className='book-data-form'>
        <label>Title</label>
        <input type='text' value={bookDataForRequest.Title} className='book-data-input' name='Title' required onChange={(e)=>inputChangeHandler(e)}/>
        <label>Description</label>
        <input type='text' value={bookDataForRequest.Description} className='book-data-input' name='Description' onChange={(e)=>inputChangeHandler(e)}/>
        <label>ISBN</label>
        <input type='text' value={bookDataForRequest.ISBN} className='book-data-input' name='ISBN' required onChange={(e)=>inputChangeHandler(e)}/>
        <label>Date published</label>
        <input type='date' value={moment(bookDataForRequest.PublishDate).format('YYYY-MM-DD')} className='book-data-input' name='PublishDate' max={moment().format('YYYY-MM-DD')} onChange={(e)=>inputChangeHandler(e)} />
        <label>Quantity</label>
        <input type='number' className='book-data-input' value = {bookDataForRequest.Quantity} required name='Quantity' min='1' max='50' onChange={(e)=>inputChangeHandler(e)}/>
        <label>Add Cover</label>
        <input id='create-book-file-input' name='Cover' className='book-data-input' type='file' onChange={(e) =>changeCoverPhotoHandler(e)} />
        <div className='create-book-icon-label-segment' >
          <label>Authors</label>
          <AddIcon className='icon' onClick={toggleAuthorsForm}/>
        </div>
        <div id='multiple-select-combo-overlay'>
          <select name='AuthorIds'
            value={bookDataForRequest.AuthorIds}
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
