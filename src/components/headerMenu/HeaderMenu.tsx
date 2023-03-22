import { NavLink } from 'react-router-dom'

import { HeaderMenuProps } from '../../interfaces/HeaderMenuProps'
import { clearSessionStorage } from '../../services/SessionStorageService'
import { SearchBar } from '../searchBar/SearchBar'
import './headerMenu.css'

export function HeaderMenu({ isAuthenticated, setIsAuthenticated }: HeaderMenuProps ) {
  const signOut = () => {
    clearSessionStorage()
    setIsAuthenticated(false)
  }
  return (
    <div className='header-menu'>
      {/*<SearchBar/> */}
      <div className='header-routing-buttons'>
        {isAuthenticated ?
          <NavLink to='/'>
            <button className='header-buttons' onClick={signOut}>Sign Out</button>
          </NavLink>:
          <NavLink to='/login' >
            <button id='header-sign-in-button' className='header-buttons'>Sign in</button>
          </NavLink>
        }
      </div>
    </div>
  )
}
