import { useEffect, useState } from 'react'

import moment from 'moment'
import { useParams } from 'react-router-dom'

import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookDetailsResponse } from '../../interfaces/BookDetailsResponse'
import { getBookDetails, getBookHistory } from '../../services/BookService'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { BookForm } from '../../components/bookForm/BookForm'
import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { BookDelete } from '../../components/bookDelete/BookDelete'
import { isUserAdmin, isUserCustomer } from '../../services/SessionStorageService'
import './bookDetails.css'
import { RentBook } from '../../components/rentBook/RentBook'
import { BookHistoryResponse } from '../../interfaces/BookHistoryResponse'
import { ReturnBook } from '../../components/returnBook/ReturnBook'

export function BookDetails() {
  const bookId = Number(useParams().bookId)
  const [ showUpdateBookDialog, setShowUpdateBookDialog ] = useState(false)
  const [ showDeleteBookDialog, setShowDeleteBookDialog ] = useState(false)
  const [ showRentBookDialog, setShowRentBookDialog ] = useState(false)
  const [ showReturnBookDialog, setShowReturnBookDialog ] = useState(false)
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
  const [ bookHistory, setBookHistory ] = useState<BookHistoryResponse[]>([])
  useEffect( () => {
    getBookDetails(bookId).then( res => {
      setBookDetails(res.data)
    }).catch(e => console.log(e))
    getBookHistory(bookId).then( res => {
      setBookHistory(res.data)
      console.log(res.data)
    }).catch(e => console.log(e))
  }, [ bookId ])

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
        <ModalDialog setShowDialog = {setShowReturnBookDialog} >
          {
            ( injectedProps : DialogContentProps) => (
              <ReturnBook {...injectedProps} />
            )
          }
        </ModalDialog>
      }
      <h1>{bookDetails.Title}</h1>
      <img id='book-details-cover' src={bookDetails.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : DefaultBookIcon} />
      <label>{bookDetails.Description}</label>
      <label> Isbn: {bookDetails.ISBN}</label>
      <label> Published : {moment(bookDetails.PublishDate).format('YYYY-MM-DD') ?? 'Unavailable'}</label>
      <label> Authors </label>
      {bookDetails.Authors.map((author) => (<p className='book-details-author-names' key={author.Id}> {author.Firstname} {author.Lastname}</p>))}
        {
          isUserAdmin() &&
          <div className='book-details-buttons'>
          <button onClick={() => setShowUpdateBookDialog(true)}>Update</button>
          <button onClick={() => setShowDeleteBookDialog(true)}>Delete</button>
          </div>
        }
        {
          isUserCustomer() &&
          <div className='book-details-buttons'>
          <button onClick={() => setShowRentBookDialog(true)}>Rent</button>
          <button onClick={() => setShowReturnBookDialog(true)}>Return</button>
          </div>
        }
        <table className='book-history-table'>
          <thead>
          <tr>
            <td>Username</td>
            <td>Rented on</td>
            <td>Returned</td>
          </tr>
          </thead>
          <tbody>
            {bookHistory.map( (item) => (
              <tr key={item.Id}>
                <td>{item.User.Email}</td>
                <td>{moment(item.RentDate).format('YYYY-MM-DD')}</td>
                <td>
                  <input type='checkbox' checked={item.IsReturned} readOnly={true}/>
                </td>
              </tr>))}
          </tbody>
        </table>
    </div>
  )
}
