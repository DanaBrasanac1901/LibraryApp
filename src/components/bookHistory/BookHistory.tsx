import { MouseEvent, useEffect, useState } from 'react'

import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { BookHistoryResponse } from '../../interfaces/BookHistoryResponse'
import { getBookHistory, returnBook } from '../../services/BookService'
import { isUserAdmin } from '../../services/SessionStorageService'
import { BookHistoryProps } from '../../interfaces/BookHistoryProps'
import './bookHistory.css'

export function BookHistory({ fetchBookDetails, newBookRented }: BookHistoryProps){
  const bookId = Number(useParams().bookId)
  const [ bookHistory, setBookHistory ] = useState<BookHistoryResponse[]>([])

  useEffect( () => {
    fetchBookHistory()
  }, [ bookId, newBookRented ])

  const fetchBookHistory = () => {
    getBookHistory(bookId).then( res => {
      setBookHistory(res.data)
    })
      .catch(( ) => toast.error('Something went wrong while loading this books history!'))
  }

  const handleReturnBook = (rentId: number) => {
    returnBook(rentId)
      .then( () => {
        fetchBookHistory()
        fetchBookDetails()
        toast.success('Book returned successfully!')
      })
      .catch(e=>console.log(e))
  }
  return(
    <>
      <h2>Book rent history</h2>
      <ToastContainer />
      <table className='book-history-table'>
        <thead>
          <tr>
            <td>Username</td>
            <td>Rented on</td>
            {isUserAdmin() && <td>Returned</td>}
          </tr>
        </thead>
        <tbody>
          {bookHistory.map( (item) => (
            <tr key={item.Id}>
              <td>{item.User.Email}</td>
              <td>{moment(item.RentDate).format('YYYY-MM-DD')}</td>
              { isUserAdmin() &&
                <td>
                  <button disabled={item.IsReturned} onClick={() => handleReturnBook(item.Id) }>Return</button>
                </td>
              }
            </tr>))}
        </tbody>
      </table>
    </>
  )
}
