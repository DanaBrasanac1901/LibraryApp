import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { returnBook } from '../../services/BookService'
import { getCurrentUserName } from '../../services/SessionStorageService'

export function ReturnBook({ submitClickEvent, isModalFirstRender, setIsModalReadyToClose, rentId }: DialogContentProps ){
  const bookId = useParams().bookId
  const navigate = useNavigate()
  useEffect(() => {
    if(isModalFirstRender || !bookId || !rentId) return
    returnBook(rentId).then( () => {
      setIsModalReadyToClose(true)
      navigate(`/book-details/${bookId}`)
    }).catch(e=>console.log(e))
  }, [ submitClickEvent ])
  return <p>Are you sure you want to return this book?</p>
}
