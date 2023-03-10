import { NavLink } from 'react-router-dom'

import { HeaderMenuProps } from '../../interfaces/HeaderMenuProps'
import { clearSessionStorage } from '../../services/SessionStorageService'
import './headerMenu.css'

export function HeaderMenu({ children, isAuthenticated, setIsAuthenticated }: HeaderMenuProps ) {
  const signOut = () => {
    clearSessionStorage()
    setIsAuthenticated(false)
  }
  return (
    <div className='header-menu'>
      {children}
      <div className='header-routing-buttons'>
        {isAuthenticated ?
          <NavLink to='/'>
            <button className='header-buttons' onClick={signOut}>Sign Out</button>
          </NavLink>:
          <NavLink to='/login' >
            <button className='header-buttons'>Sign in</button>
          </NavLink>
        }
      </div>
    </div>
  )
}
