import { NavLink } from 'react-router-dom'

import { FooterMenuProps } from '../../interfaces/FooterMenuProps'
import './footerMenu.css'

export function FooterMenu({ isAuthenticated }:FooterMenuProps) {
  return (
    <div className='footer'>
      <NavLink to='/'>
        <button className='footer-buttons'>Home</button>
      </NavLink>
      {!isAuthenticated &&
        <NavLink to='/login' >
          <button className='footer-buttons'>Sign in</button>
        </NavLink>
      }
    </div>
  )
}
