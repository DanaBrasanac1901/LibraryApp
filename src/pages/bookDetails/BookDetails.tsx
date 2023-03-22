import { useEffect, useState } from 'react'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookDetailsResponse } from '../../interfaces/BookDetailsResponse'
import { getBookDetails, getBookHistory } from '../../services/BookService'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { BookForm } from '../../components/bookForm/BookForm'
import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { BookDelete } from '../../components/bookDelete/BookDelete'
import { isUserAdmin } from '../../services/SessionStorageService'
import { RentBook } from '../../components/rentBook/RentBook'
import { ReturnBook } from '../../components/returnBook/ReturnBook'
import { BookHistory } from '../../components/bookHistory/BookHistory'
import './bookDetails.css'

export function BookDetails() {
  const bookId = Number(useParams().bookId)
  const [ showUpdateBookDialog, setShowUpdateBookDialog ] = useState(false)
  const [ showDeleteBookDialog, setShowDeleteBookDialog ] = useState(false)
  const [ showRentBookDialog, setShowRentBookDialog ] = useState(false)
  const [ showReturnBookDialog, setShowReturnBookDialog ] = useState(false)
  const [ rentId, setRentId ] = useState(0)
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
    }).catch(( ) => toast('Something went wrong while loading this book!'))
  }, [ bookId ])

  const returnClickHandler = () => {
    return
  }

  return (
    <div className='book-details-page'>
      {showUpdateBookDialog &&
        <ModalDialog setShowDialog = {setShowUpdateBookDialog} bookDetails = {bookDetails} >
          {
            ( injectedProps : DialogContentProps) => (
              <BookForm {...injectedProps} />
            )
          }
        </ModalDialog>
      }
      {showDeleteBookDialog &&
        <ModalDialog setShowDialog = {setShowDeleteBookDialog} >
          {
            ( injectedProps : DialogContentProps) => (
              <BookDelete {...injectedProps} />
            )
          }
        </ModalDialog>
      }
      {showRentBookDialog &&
        <ModalDialog setShowDialog = {setShowRentBookDialog} >
          {
            ( injectedProps : DialogContentProps) => (
              <RentBook {...injectedProps} />
            )
          }
        </ModalDialog>
      }
      {showReturnBookDialog &&
        <ModalDialog setShowDialog = {setShowReturnBookDialog}  rentId={rentId}>
          {
            ( injectedProps : DialogContentProps) => (
              <ReturnBook {...injectedProps} />
            )
          }
        </ModalDialog>
      }
      <h1>{bookDetails.Title}</h1>
      <img id='book-details-cover' src={bookDetails.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : DefaultBookIcon} />
      <label> Authors </label>
      {bookDetails.Authors.map((author) => (<p className='book-details-author-names' key={author.Id}> {author.Firstname} {author.Lastname}</p>))}
      <label>{bookDetails.Description}</label>
      <label> Isbn: {bookDetails.ISBN}</label>
      <label> Published : {moment(bookDetails.PublishDate).format('YYYY-MM-DD') ?? 'Unavailable'}</label>
      <div className='book-details-buttons'>
        {
          isUserAdmin() &&
            <>
              <button onClick={() => setShowUpdateBookDialog(true)}>Update</button>
              <button onClick={() => setShowDeleteBookDialog(true)}>Delete</button>
            </>
        }
        <button onClick={() => setShowRentBookDialog(true)}>Rent</button>
        <button onClick={() => returnClickHandler()}>Return</button>
      </div>
      <BookHistory setRentId={setRentId} />
    </div>
  )
}
