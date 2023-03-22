import { useEffect, useState } from 'react'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookDetailsResponse } from '../../interfaces/BookDetailsResponse'
import { getBookDetails, rentBook } from '../../services/BookService'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { BookForm } from '../../components/bookForm/BookForm'
import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { BookDelete } from '../../components/bookDelete/BookDelete'
import { isUserAdmin } from '../../services/SessionStorageService'
import { BookHistory } from '../../components/bookHistory/BookHistory'
import './bookDetails.css'

export function BookDetails() {
  const bookId = Number(useParams().bookId)
  const [ showUpdateBookDialog, setShowUpdateBookDialog ] = useState(false)
  const [ showDeleteBookDialog, setShowDeleteBookDialog ] = useState(false)
  const [ newBookRented, setNewBookRented ] = useState(false)
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
    fetchBookDetails()
  }, [ bookId ])

  const fetchBookDetails = () => {
    getBookDetails(bookId).then( res => {
      setBookDetails(res.data)
    }).catch(( ) => toast.error('Something went wrong while loading this book!'))
  }

  const handleRentBook = () => {
    rentBook(bookId).then( () => {
      toast.success('Book rented succesfully!')
      setNewBookRented((previousState) => !previousState)
    }).catch( e=>console.log(e))
  }

  return (
    <div className='book-details-page'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />
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
        <button onClick={handleRentBook}>Rent</button>
      </div>
      <BookHistory fetchBookDetails={fetchBookDetails} newBookRented={newBookRented} />
    </div>
  )
}
