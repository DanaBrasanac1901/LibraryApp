import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { deleteBook } from '../../services/BookService'

export function BookDelete({ submitClickEvent, isModalFirstRender, setIsModalReadyToClose }: DialogContentProps ){
  const bookId = useParams().bookId
  const navigate = useNavigate()
  useEffect(() => {
    if(isModalFirstRender || !bookId) return
    deleteBook(bookId).then( () => {
      setIsModalReadyToClose(true)
      navigate('/')
    }).catch(e=>console.log(e))
  }, [ submitClickEvent ])
  return <p>Are you sure you want to delete this book?</p>
}
