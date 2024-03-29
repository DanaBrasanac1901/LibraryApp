import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { BiLoaderCircle as LoadingIcon } from 'react-icons/bi'

import { BookCard } from '../../components/bookCard/BookCard'
import { BookForm } from '../../components/bookForm/BookForm'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { DialogContentProps } from '../../interfaces/DialogContentProps'
import { GetAllBooksResponse } from '../../interfaces/GetAllBooksResponse'
import { getAllBooksPaginated } from '../../services/BookService'
import { isUserAdmin } from '../../services/SessionStorageService'
import './homePage.css'

export function HomePage() {

  const navigate = useNavigate()
  const [ showCreateBookDialog, setShowCreateBookDialog ] = useState(false)
  const [ page, setPage ] = useState(1)
  const [ hasMore, setHasMore ] = useState(true)
  const [ allBooks, setAllBooks ] = useState<GetAllBooksResponse>(
    {
      Items: [],
      TotalCount: 0
    }
  )
  const booksPerPage = 12

  useEffect( () => {
    fetchBooks()
  },[ page ])

  const fetchBooks = () => {
    getAllBooksPaginated({ pageNumber: page , pageLength: booksPerPage }).then(
      res => {
        setHasMore( page*booksPerPage <= res.data.TotalCount)
        setAllBooks( (previousState) => {
          return {
            ...previousState,
            TotalCount: res.data.TotalCount,
            Items: [ ...previousState.Items, ...res.data.Items ]
          }
        })
      }).catch(e => console.log(e))

  }

  const nextPage = () => {
    setPage((previousState) => previousState+=1)
  }

  const openDialog = () => {
    setShowCreateBookDialog(true)
  }

  return (
    <div className='home-page'>
      {isUserAdmin() && <button id='add-book-button' onClick = {openDialog}>Add book</button>}
      {showCreateBookDialog &&
        <ModalDialog setShowDialog = {setShowCreateBookDialog}>
          {
            (injectedProps : DialogContentProps) => (
              <BookForm {...injectedProps} />
            )
          }
        </ModalDialog>}
      <div className='home-page-books'>
        <InfiniteScroll
          dataLength={page*booksPerPage}
          next={nextPage}
          hasMore={hasMore}
          loader={
            <LoadingIcon size={50}/>
          }
          endMessage={<h2>You have seen all of the books</h2>}
        >
          <div className='home-page-infinite-scroll-content'>
            {allBooks.Items.map((item) =>
              (
                <div key = {item.Id} onClick={() => navigate(`book-details/${item.Id}`)}>
                  <BookCard
                    Title = {item.Title}
                    Isbn={item.Isbn}
                    Cover = {item.Cover}
                    Authors={item.Authors}
                  />
                </div>
              )
            )}
          </div>

        </InfiniteScroll>
      </div>
    </div>

  )
}
