import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { returnBook } from '../../services/BookService'

export function ReturnBook({ submitClickEvent, isModalFirstRender, setIsModalReadyToClose }: DialogContentProps ){
  const bookId = useParams().bookId
  const navigate = useNavigate()
  useEffect(() => {
    if(isModalFirstRender || !bookId) return
    returnBook(bookId).then( () => {
      setIsModalReadyToClose(true)
      navigate(`/book-details/${bookId}`)
    }).catch(e=>console.log(e))
  }, [ submitClickEvent ])
  return <p>Are you sure you want to return this book?</p>
}
