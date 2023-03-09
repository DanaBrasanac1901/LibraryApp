import { Link } from 'react-router-dom'
import './footer-menu.css'

export function FooterMenu({ isAuthenticated }:{ isAuthenticated:boolean }) {
  return (
    <span className='footer'>
      <div>
        <Link to='/'>
          <button className='footer-buttons'>Home</button>
        </Link>
      </div>
      {isAuthenticated ?
        <Link to='/profile'>
          <button className='footer-buttons'>Profile</button>
        </Link>:
        <Link to='/login' >
          <button className='footer-buttons'>Sign in</button>
        </Link>
      }
    </span>
  )
}
