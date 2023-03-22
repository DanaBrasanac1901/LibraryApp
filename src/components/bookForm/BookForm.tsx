import { useState, useEffect } from 'react'

import moment from 'moment'
import { IoIosAddCircle as AddIcon } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import { Author } from '../../interfaces/Author'
import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { getAllAuthors } from '../../services/AuthorService'
import { CreateAuthorForm } from '../createAuthorForm/CreateAuthorForm'
import { createBook, updateBook } from '../../services/BookService'
import { BookData, DialogContentProps } from '../../interfaces/DialogContentProps'
import './bookForm.css'



export function BookForm({ submitClickEvent, isModalFirstRender, bookDetails, setIsModalReadyToClose }: DialogContentProps){
  const [ showCreateAuthorForm, setShowCreateAuthorForm ] = useState(false)
  const [ authors, setAuthors ] = useState<Author[]>([])
  const navigate = useNavigate()
  const [ cover, setCover ] = useState( bookDetails?.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : DefaultBookIcon)
  const [ bookDataForRequest, setBookDataForRequest ] = useState<BookData>({
    'Title': bookDetails ? bookDetails.Title : '',
    'Description': bookDetails ? bookDetails.Description : '',
    'ISBN': bookDetails ? bookDetails.ISBN : '',
    'Quantity': bookDetails ? bookDetails.Quantity : 0,
    'PublishDate': bookDetails ? moment(bookDetails.PublishDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD').toString(),
    'AuthorIds': bookDetails ? bookDetails.Authors.map( author => author.Id.toString()) : [],
    'Cover': new Blob()
  })

  useEffect(() => {
    if(isModalFirstRender) return
    const formForRequest = prepareFormData()
    if(bookDetails){
      formForRequest.append('Id', bookDetails.Id.toString())
      updateBook(formForRequest)
        .then( () => {
          setIsModalReadyToClose(true)
          navigate(`/book-details/${bookDetails.Id}`)
        }).catch(e=>console.log(e))
    }else{
      createBook(formForRequest).then(
        () => {
          setIsModalReadyToClose(true)
          navigate('/')
        })
        .catch(e => console.log(e))
    }

  }, [ submitClickEvent ])

  useEffect(() => {
    fetchAuthorsForSelect()
  }, [])

  const toggleAuthorsForm = () => {
    setShowCreateAuthorForm(!showCreateAuthorForm)
  }

  const fetchAuthorsForSelect = ()  => {
    getAllAuthors().then( res => { setAuthors(res.data)}).catch(e => console.log(e))
  }

  const prepareFormData = () =>
  {
    const formData = new FormData()
    formData.append('Title', bookDataForRequest.Title)
    formData.append('Description', bookDataForRequest.Description)
    formData.append('ISBN', bookDataForRequest.ISBN)
    formData.append('Quantity', bookDataForRequest.Quantity.toString())
    if (bookDataForRequest.Cover!==null) formData.append('Cover', bookDataForRequest.Cover)
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
    const files = event.target.files
    const reader = new FileReader()
    if (files !== null) {
      reader.readAsDataURL(files[0])
      setBookDataForRequest({ ...bookDataForRequest, ['Cover']: files[0] })
      reader.onloadend = () => {
        if(reader.result) setCover(reader.result as string )
      }
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
        <input type='date' className='book-data-input' value = {bookDataForRequest.PublishDate} name='PublishDate' max={moment().format('YYYY-MM-DD')} onChange={(e)=>inputChangeHandler(e)} />
        <label>Quantity</label>
        <input type='number' className='book-data-input' value = {bookDataForRequest.Quantity} required name='Quantity' min='1' max='50' onChange={(e)=>inputChangeHandler(e)}/>
        <label>Add Cover</label>
        <img id='book-update-cover' src={cover} />
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
      { showCreateAuthorForm && <CreateAuthorForm fetchAuthors={fetchAuthorsForSelect} />}
    </>
  )
}
