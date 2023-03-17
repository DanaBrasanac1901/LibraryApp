import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookDetailsResponse } from '../../interfaces/BookDetailsResponse'
import { getBookDetails } from '../../services/BookService'
import './bookDetails.css'

export function BookDetails() {
  const bookId = Number(useParams().bookId)
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
    }).catch(e => console.log(e))
  }, [ bookId ])
  return (
    <div className='book-details-page'>
      <h1>{bookDetails.Title}</h1>
      <img id='book-details-cover' src={DefaultBookIcon} />
      <label>{bookDetails.Description}</label>
      <label> Isbn: {bookDetails.ISBN}</label>
      <label> Published : {bookDetails.PublishDate}</label>
      <label> Authors </label>
    </div>
  )
}
