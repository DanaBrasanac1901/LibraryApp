import DefaultBookIcon from '../../assets/generic-book-icon.png'

export function BookCard() {
  return(
    <div className='book-card'>
      <h1>Naslov</h1>
      <img src={DefaultBookIcon}  />
    </div>
  )
}
