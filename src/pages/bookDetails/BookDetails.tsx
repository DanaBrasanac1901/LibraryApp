import { useEffect, useState } from 'react'

import moment from 'moment'
import { useParams } from 'react-router-dom'

import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookDetailsResponse } from '../../interfaces/BookDetailsResponse'
import { getBookDetails } from '../../services/BookService'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { BookForm } from '../../components/bookForm/BookForm'
import './bookDetails.css'
import { BookFormProps } from '../../interfaces/BookFormProps'

export function BookDetails() {
  const bookId = Number(useParams().bookId)
  const [ showUpdateBookDialog, setShowUpdateBookDialog ] = useState(false)
  const [ bookDetails, setBookDetails ] = useState<BookDetailsResponse>({
    Id: 0,
    Title: '',
    Description: '',
    ISBN: '',
    Quantity: 0,
    Available: 0,
    Cover: '',
    PublishDate: '',
    Authors: []
  })
  useEffect( () => {
    getBookDetails(bookId).then( res => {
      setBookDetails(res.data)
      console.log(res.data)
    }).catch(e => console.log(e))
  }, [ bookId ])

  return (
    <div className='book-details-page'>
      {showUpdateBookDialog &&
        <ModalDialog setShowDialog = {setShowUpdateBookDialog} >
          {
            (injectedProps : BookFormProps) => (
              <BookForm {...injectedProps} />
            )
          }
        </ModalDialog>
      }
      <h1>{bookDetails.Title}</h1>
      <img id='book-details-cover' src={bookDetails.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : DefaultBookIcon} />
      <label>{bookDetails.Description}</label>
      <label> Isbn: {bookDetails.ISBN}</label>
      <label> Published : {moment(bookDetails.PublishDate).format('DD/MM/YYYY')}</label>
      <label> Authors </label>
      {bookDetails.Authors.map((author) => (<p className='book-details-author-names' key={author.Id}> {author.Firstname} {author.Lastname}</p>))}
      <button id='book-details-update-button' onClick={() => setShowUpdateBookDialog(true)}>Update</button>
    </div>
  )
}
