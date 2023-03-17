
import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookCardProps } from '../../interfaces/BookCardProps'
import './bookCard.css'

export function BookCard({ Title, Isbn, Cover, Authors }: BookCardProps) {
  const DataUrl = Cover ? `data:image/png;base64, ${Cover}` : DefaultBookIcon
  return(
    <div className='book-card'>
      <h1>{Title}</h1>
      <img id='img' src= { DataUrl} />
      {Authors.map((item)=> (<p className='author-names' key = {item.Id} >{item.FirstName} {item.LastName}</p>))}
      <label className='book-card-isbn-segment'>Isbn: {Isbn}</label>
    </div>
  )
}
