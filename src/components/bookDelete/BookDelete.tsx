import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

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
    }).catch(() => toast.error('Something went wrong while deleting this book.',{
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: false,
      theme: 'colored',
      transition: Bounce
    }))
  }, [ submitClickEvent ])
  return(
    <>
      <p>Are you sure you want to delete this book?</p>
    </>
  )
}
