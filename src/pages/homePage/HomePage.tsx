import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'

import { BookCard } from '../../components/bookCard/BookCard'
import { CreateBook } from '../../components/createBook/CreateBook'
import { ModalDialog } from '../../components/modalDialog/ModalDialog'
import { GetAllBooksResponse } from '../../interfaces/GetAllBooksResponse'
import { createBook, getAllBooksPaginated } from '../../services/BookService'
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
  const [ bookData, setBookData ] = useState({
    'Title': '',
    'Description': '',
    'ISBN': '',
    'Quantity': 0,
    'PublishDate': '',
    'AuthorIds': [] as string[],
    'Cover': new Blob()
  })

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

  const createBookSubmit = async () => {
    const formData = new FormData()
    formData.append('Title', bookData.Title)
    formData.append('Description', bookData.Description)
    formData.append('ISBN', bookData.ISBN)
    formData.append('Quantity', bookData.Quantity.toString())
    formData.append('Cover', bookData.Cover)
    formData.append('PublishDate', bookData.PublishDate)
    bookData.AuthorIds.forEach((authorId) => formData.append('AuthorIds', authorId))
    try{
      await createBook(formData)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='home-page'>
      {isUserAdmin() && <button onClick = {openDialog}>Add book</button>}
      {showCreateBookDialog &&
        <ModalDialog setShowDialog = {setShowCreateBookDialog} onSubmit = {() =>{void createBookSubmit()}}>
          <CreateBook setBookData = {setBookData} bookData = {bookData}/>
        </ModalDialog>}
      <div className='home-page-books'>
        <InfiniteScroll
          dataLength={page*booksPerPage}
          next={nextPage}
          hasMore={hasMore}
          loader={
            <div className='infinite-scroll-loader'>
              <h2>loading</h2>
            </div>}
          endMessage={<h2>You have seen all of the books</h2>}
        >
          <div className='home-page-infinite-scroll-content'>
            {allBooks.Items.map((item) =>
              (<div key = {item.Id} onClick={() => navigate(`book-details/${item.Id}`)}> <BookCard Title = {item.Title} Isbn={item.Isbn} Cover = {item.Cover} Authors={item.Authors}/></div>))}
          </div>

        </InfiniteScroll>
      </div>
    </div>

  )
}
