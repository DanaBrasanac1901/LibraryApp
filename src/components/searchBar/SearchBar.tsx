import { ImSearch } from 'react-icons/im'
import './searchBar.css'

export function SearchBar() {
  return (
    <div className='search-bar'>
      <input className='search-bar-input' />
      <button className='search-button'>
        <ImSearch className='search-button-icon' />
      </button>
    </div>
  )
}
