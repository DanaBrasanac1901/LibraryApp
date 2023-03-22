import { useEffect, useState } from 'react'

import moment from 'moment'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { BookHistoryResponse } from '../../interfaces/BookHistoryResponse'
import { getBookHistory } from '../../services/BookService'
import { BookHistoryProps } from '../../interfaces/BookHistoryProps'
import { getCurrentUserName } from '../../services/SessionStorageService'
import './bookHistory.css'


export function BookHistory({ setRentId }: BookHistoryProps){
  const bookId = Number(useParams().bookId)
  const [ bookHistory, setBookHistory ] = useState<BookHistoryResponse[]>([])
  const currentUserName = getCurrentUserName()

  useEffect( () => {
    getBookHistory(bookId).then( res => {
      setBookHistory(res.data)
      const rentInstance = findRentId()
      if( rentInstance) setRentId(rentInstance)
    }).catch(( ) => toast('Something went wrong while loading this books history!'))
  }, [ bookId ])

  const findRentId = () => {
    const rentInstance =  bookHistory.find( obj => obj.User.Email === currentUserName)
    if(!rentInstance) return
    return rentInstance.Id
  }

  return(
    <>
      <h2>Book rent history</h2>
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
    </>
  )
}
