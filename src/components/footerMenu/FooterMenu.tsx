import { NavLink } from 'react-router-dom'
import './footerMenu.css'

export function FooterMenu({ isAuthenticated }:{ isAuthenticated:boolean }) {
  return (
    <span className='footer'>
      <div>
        <NavLink to='/'>
          <button className='footer-buttons'>Home</button>
        </NavLink>
      </div>
      {isAuthenticated ?
        <NavLink to='/profile'>
          <button className='footer-buttons'>Profile</button>
        </NavLink>:
        <NavLink to='/login' >
          <button className='footer-buttons'>Sign in</button>
        </NavLink>
      }
    </span>
  )
}
