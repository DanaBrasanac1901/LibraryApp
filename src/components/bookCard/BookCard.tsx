import DefaultBookIcon from '../../assets/generic-book-icon.png'
import { BookCardProps } from '../../interfaces/BookCardProps'
import './bookCard.css'

export function BookCard({ Title, Isbn, Cover, Authors }: BookCardProps) {
  return(
    <div className='book-card'>
      <h1>{Title}</h1>
      <img id='img' src={DefaultBookIcon}  />
      <p>{Isbn}</p>
    </div>
  )
}
