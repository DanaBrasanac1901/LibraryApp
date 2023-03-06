import { ImSearch } from 'react-icons/im'
import '../styles/SearchBar.css'

export function SearchBar() {
  return (
    <div className='search_bar'>
      <input className='search_bar_input' />
      <button className='search_button'>
        <ImSearch className='search_button_icon' />
      </button>
    </div>
  )
}
