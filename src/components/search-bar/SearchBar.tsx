import { ImSearch } from 'react-icons/im'
import './search-bar.css'

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
